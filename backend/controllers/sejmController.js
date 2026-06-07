const axios = require("axios");

const SEJM_API = "https://api.sejm.gov.pl";
const TERM = "term10";

const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" };

const cache = new Map();
function fromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}
function toCache(key, data, ttlMs) {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}
const TTL_CLUBS = 30 * 60 * 1000; // 30 min
const TTL_LEADERSHIP = 60 * 60 * 1000; // 60 min
const TTL_PROCEEDINGS = 5 * 60 * 1000; //  5 min

function norm(s) {
  return (s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function nameFromPrintTitle(title) {
  const m = title.match(/[-–]\s*pose[łl]\w*\s+(.+?)\s*\.?\s*$/i);
  return m ? m[1].trim() : null;
}

async function buildPrezydiumFromPrints(allMPs) {
  const [{ data: prints }, { data: proceedings }] = await Promise.all([
    axios.get(`${SEJM_API}/sejm/${TERM}/prints`, {
      headers: HEADERS,
      timeout: 12_000,
    }),
    axios.get(`${SEJM_API}/sejm/${TERM}/proceedings`, {
      headers: HEADERS,
      timeout: 12_000,
    }),
  ]);

  const electionPrints = prints
    .filter((p) =>
      /kandydat na stanowisko (wice)?marsza[łl]ka sejmu/i.test(p.title),
    )
    .sort((a, b) => Number(a.number) - Number(b.number));

  const recallPrints = prints.filter((p) =>
    /wniosek o odwo.anie wicemar/i.test(p.title),
  );
  const recalledNames = new Set(
    recallPrints
      .map((p) => norm(nameFromPrintTitle(p.title) ?? ""))
      .filter(Boolean),
  );

  const dateToProc = {};
  for (const proc of proceedings) {
    for (const d of proc.dates ?? []) dateToProc[d] = proc.number;
  }
  const procNums = [
    ...new Set(
      electionPrints.map((p) => dateToProc[p.deliveryDate]).filter(Boolean),
    ),
  ];
  const votingsByProc = {};
  await Promise.all(
    procNums.map(async (num) => {
      try {
        const { data } = await axios.get(
          `${SEJM_API}/sejm/${TERM}/votings/${num}`,
          { headers: HEADERS, timeout: 8_000 },
        );
        votingsByProc[num] = data;
      } catch {
        votingsByProc[num] = [];
      }
    }),
  );

  let marshal = null;
  const deputies = new Map();

  for (const p of electionPrints) {
    const rawName = nameFromPrintTitle(p.title);
    if (!rawName) continue;

    const isMarszalek =
      /stanowisko Marsza[łl]ka Sejmu/i.test(p.title) &&
      !/Wicemarsza/i.test(p.title);

    const mp = allMPs.find((m) => {
      const full = norm(`${m.firstName} ${m.lastName}`);
      return norm(rawName)
        .split(" ")
        .every((w) => w.length > 1 && full.includes(w));
    });
    if (!mp) continue;

    const procNum = dateToProc[p.deliveryDate];
    if (procNum) {
      const votes = votingsByProc[procNum] ?? [];
      const normName = norm(rawName);
      const vote = votes.find((v) => {
        const topic = norm(v.topic ?? v.title ?? "");
        return normName
          .split(" ")
          .some((w) => w.length > 2 && topic.includes(w));
      });
      if (vote && vote.yes !== undefined && vote.yes <= (vote.no ?? 0))
        continue;
    }

    if (isMarszalek) {
      deputies.delete(norm(rawName));
      marshal = { mp };
    } else {
      deputies.set(norm(rawName), { mp });
    }
  }

  for (const recalled of recalledNames) {
    for (const key of deputies.keys()) {
      if (key.includes(recalled) || recalled.includes(key))
        deputies.delete(key);
    }
  }

  const result = [];
  if (marshal) {
    result.push({
      id: marshal.mp.id,
      name: `${marshal.mp.firstName} ${marshal.mp.lastName}`,
      title: "Marszałek Sejmu RP",
      role: "marszalek",
      club: marshal.mp.club,
      photo: `${SEJM_API}/sejm/${TERM}/MP/${marshal.mp.id}/photo`,
    });
  }
  for (const { mp } of deputies.values()) {
    result.push({
      id: mp.id,
      name: `${mp.firstName} ${mp.lastName}`,
      title: "Wicemarszałek Sejmu RP",
      role: "wicemarszalek",
      club: mp.club,
      photo: `${SEJM_API}/sejm/${TERM}/MP/${mp.id}/photo`,
    });
  }
  return result;
}

async function getSejmLeadership(req, res) {
  const cached = fromCache("leadership");
  if (cached) return res.json(cached);
  try {
    const { data: allMPs } = await axios.get(`${SEJM_API}/sejm/${TERM}/MP`, {
      headers: HEADERS,
      timeout: 10_000,
    });

    const people = await buildPrezydiumFromPrints(allMPs);
    toCache("leadership", people, TTL_LEADERSHIP);
    res.json(people);
  } catch (err) {
    res
      .status(502)
      .json({ error: "Failed to fetch Sejm leadership", detail: err.message });
  }
}

async function getSejmClubs(req, res) {
  const cached = fromCache("clubs");
  if (cached) return res.json(cached);
  try {
    const [{ data: list }, { data: allMPs }] = await Promise.all([
      axios.get(`${SEJM_API}/sejm/${TERM}/clubs`, {
        headers: HEADERS,
        timeout: 10_000,
      }),
      axios.get(`${SEJM_API}/sejm/${TERM}/MP`, {
        headers: HEADERS,
        timeout: 10_000,
      }),
    ]);

    const activeCounts = {};
    allMPs
      .filter((m) => m.active !== false)
      .forEach((m) => {
        activeCounts[m.club] = (activeCounts[m.club] ?? 0) + 1;
      });

    const clubs = list.map((c) => ({
      id: c.id,
      name: c.name,
      membersCount: activeCounts[c.id] ?? 0,
    }));

    toCache("clubs", clubs, TTL_CLUBS);
    res.json(clubs);
  } catch (err) {
    res
      .status(502)
      .json({ error: "Failed to fetch Sejm clubs", detail: err.message });
  }
}

async function getSejmProceedings(req, res) {
  const cached = fromCache("proceedings");
  if (cached) return res.json(cached);
  try {
    const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/proceedings`, {
      headers: HEADERS,
      timeout: 10_000,
    });

    const today = new Date().toISOString().slice(0, 10);

    const sorted = [...data]
      .sort((a, b) => b.number - a.number)
      .slice(0, 10)
      .map((p) => ({
        number: p.number,
        title: `${p.number}. Posiedzenie Sejmu RP`,
        dates: p.dates ?? [],
        date: p.dates?.[0] ?? "",
        upcoming: p.current === true || (p.dates?.[0] ?? "") > today,
      }));

    toCache("proceedings", sorted, TTL_PROCEEDINGS);
    res.json(sorted);
  } catch (err) {
    res
      .status(502)
      .json({ error: "Failed to fetch proceedings", detail: err.message });
  }
}

async function getMPPhoto(req, res) {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${SEJM_API}/sejm/${TERM}/MP/${id}/photo`,
      { headers: HEADERS, responseType: "arraybuffer", timeout: 8_000 },
    );
    res.set("Content-Type", response.headers["content-type"] || "image/jpeg");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(response.data);
  } catch {
    res.status(404).end();
  }
}

async function getClubLogo(req, res) {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${SEJM_API}/sejm/${TERM}/clubs/${encodeURIComponent(id)}/logo`,
      { headers: HEADERS, responseType: "arraybuffer", timeout: 8_000 },
    );
    res.set("Content-Type", response.headers["content-type"] || "image/png");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(response.data);
  } catch {
    res.status(404).end();
  }
}
async function getAllMPs(req, res) {
  const cached = fromCache("all_mps");
  if (cached) return res.json(cached);
  try {
    const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/MP`, {
      headers: HEADERS,
      timeout: 15_000,
    });
    const mps = data
      .filter((m) => m.active !== false)
      .map((m) => ({
        id: m.id,
        firstLastName: m.firstLastName,
        lastFirstName: m.lastFirstName,
        club: m.club,
        districtName: m.districtName,
        districtNum: m.districtNum,
        profession: m.profession ?? null,
        birthDate: m.birthDate ?? null,
        educationLevel: m.educationLevel ?? null,
      }))
      .sort((a, b) =>
        (a.lastFirstName ?? "").localeCompare(b.lastFirstName ?? "", "pl"),
      );
    toCache("all_mps", mps, 30 * 60 * 1000);
    res.json(mps);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch MPs", detail: err.message });
  }
}

async function getMPDetails(req, res) {
  const { id } = req.params;
  const KEY = `mp_detail_${id}`;
  const cached = fromCache(KEY);
  if (cached) return res.json(cached);
  try {
    const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/MP/${id}`, {
      headers: HEADERS,
      timeout: 10_000,
    });
    toCache(KEY, data, 60 * 60 * 1000);
    res.json(data);
  } catch (err) {
    res
      .status(502)
      .json({ error: "Failed to fetch MP details", detail: err.message });
  }
}

async function getSittingDates() {
  const KEY = "sitting_dates";
  const cached = fromCache(KEY);
  if (cached) return cached;
  const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/proceedings`, {
    headers: HEADERS, timeout: 10_000,
  });
  const pairs = [];
  for (const proc of data) {
    if (proc.number <= 0) continue;
    for (const date of proc.dates ?? []) {
      pairs.push({ sitting: proc.number, date });
    }
  }
  toCache(KEY, pairs, 30 * 60 * 1000);
  return pairs;
}

async function getMPVotings(req, res) {
  const { id } = req.params;
  const KEY = `mp_votings_${id}`;
  const cached = fromCache(KEY);
  if (cached) return res.json(cached);

  try {
    const pairs = await getSittingDates(); 

    const results = await Promise.allSettled(
      pairs.map(({ sitting, date }) =>
        axios.get(`${SEJM_API}/sejm/${TERM}/MP/${id}/votings/${sitting}/${date}`, {
          headers: HEADERS, timeout: 10_000,
        }).then(r => ({ sitting, date, votes: r.data ?? [] }))
      )
    );

    const seen = new Set();
    const mpVotes = [];
    for (const r of results) {
      if (r.status !== "fulfilled") continue;
      const { sitting, date, votes } = r.value;
      for (const v of votes) {
        const key = `${v.date ?? date}_${v.votingNumber}`;
        if (seen.has(key)) continue;
        seen.add(key);
        mpVotes.push({
          sitting,
          votingNumber: v.votingNumber,
          date:         (v.date ?? date).slice(0, 10),
          title:        v.topic ?? v.title ?? null,
          vote:         v.vote,
        });
      }
    }

    mpVotes.sort((a, b) => a.sitting - b.sitting || a.votingNumber - b.votingNumber);

    toCache(KEY, mpVotes, 10 * 60 * 1000);
    res.json(mpVotes);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch MP votings", detail: err.message });
  }
}

async function fetchCommitteeData() {
  const KEY = "committees_full";
  const cached = fromCache(KEY);
  if (cached) return cached;

  const { data: list } = await axios.get(`${SEJM_API}/sejm/${TERM}/committees`, {
    headers: HEADERS,
    timeout: 15_000,
  });

  const subCodes = [
    ...new Set(
      list.flatMap((c) =>
        (c.subCommittees ?? []).filter((s) => typeof s === "string"),
      ),
    ),
  ];

  const subResults = await Promise.allSettled(
    subCodes.map((code) =>
      axios
        .get(`${SEJM_API}/sejm/${TERM}/committees/${code}`, {
          headers: HEADERS,
          timeout: 8_000,
        })
        .then((r) => ({ code, data: r.data }))
        .catch(() => null),
    ),
  );

  const subMap = {};
  subResults.forEach((r) => {
    if (r.status === "fulfilled" && r.value) {
      subMap[r.value.code] = r.value.data;
    }
  });

  const enriched = list.map((c) => ({
    code: c.code,
    name: c.name,
    type: c.type,
    members: c.members ?? [],
    subCommittees: (c.subCommittees ?? [])
      .filter((s) => typeof s === "string" && subMap[s])
      .map((code) => ({
        code,
        name: subMap[code].name,
        members: subMap[code].members ?? [],
      })),
  }));

  toCache(KEY, enriched, 30 * 60 * 1000); 
  return enriched;
}

async function getMPCommittees(req, res) {
  const { id } = req.params;
  const mpId = Number(id);
  const KEY = `mp_committees_${id}`;
  const cached = fromCache(KEY);
  if (cached) return res.json(cached);

  try {
    const committees = await fetchCommitteeData();

    const memberships = committees.flatMap((c) => {
      const directMember = (c.members ?? []).find((m) => m.id === mpId);
      const subMemberships = (c.subCommittees ?? [])
        .map((sc) => {
          const m = (sc.members ?? []).find((sm) => sm.id === mpId);
          return m ? { name: sc.name, function: m.function ?? "Członek" } : null;
        })
        .filter(Boolean);

      if (!directMember && subMemberships.length === 0) return [];

      return [{
        code: c.code,
        name: c.name,
        type: c.type,
        function: directMember
          ? (directMember.function || "Członek")
          : null,
        subCommittees: subMemberships,
      }];
    });

    toCache(KEY, memberships, 15 * 60 * 1000); 
    res.json(memberships);
  } catch (err) {
    res
      .status(502)
      .json({ error: "Failed to fetch MP committees", detail: err.message });
  }
}

async function fetchAllPages(path, limit = 200) {
  const all = [];
  let offset = 0;
  const MAX = 500;
  for (let i = 0; i < MAX; i++) {
    let data;
    try {
      ({ data } = await axios.get(`${SEJM_API}/sejm/${TERM}/${path}`, {
        params: { limit, offset },
        headers: HEADERS,
        timeout: 25_000,
      }));
    } catch {
      break; 
    }
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    const lastNum = data.at(-1)?.num;
    offset = lastNum != null ? lastNum + 1 : offset + limit;
    if (data.length < limit) break; 
  }
  return all;
}

async function fetchAllInterpellations() {
  const KEY = "all_interpellations";
  const cached = fromCache(KEY);
  if (cached) return cached;
  const all = await fetchAllPages("interpellations");
  toCache(KEY, all, 30 * 60 * 1000);
  return all;
}

async function getMPInterpellations(req, res) {
  const { id } = req.params;
  const mpId = Number(id);
  const KEY = `mp_interpellations_${id}`;
  const cached = fromCache(KEY);
  if (cached) return res.json(cached);
  try {
    const all = await fetchAllInterpellations();
    const filtered = all
      .filter((item) => (item.from ?? []).some((f) => Number(f) === mpId))
      .map((item) => ({
        num: item.num,
        title: item.title,
        receiptDate: item.receiptDate,
        sentDate: item.sentDate,
        to: item.to ?? [],
        answered: (item.replies ?? []).some((r) => !r.prolongation),
        answerDelayedDays: item.answerDelayedDays ?? 0,
        webUrl: (item.links ?? []).find((l) => l.rel === "web-description")?.href ?? null,
      }))
      .sort((a, b) => (b.receiptDate ?? "").localeCompare(a.receiptDate ?? ""));
    toCache(KEY, filtered, 10 * 60 * 1000);
    res.json(filtered);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch interpellations", detail: err.message });
  }
}

async function fetchAllWrittenQuestions() {
  const KEY = "all_written_questions";
  const cached = fromCache(KEY);
  if (cached) return cached;
  const all = await fetchAllPages("writtenQuestions");
  toCache(KEY, all, 30 * 60 * 1000);
  return all;
}

async function getMPWrittenQuestions(req, res) {
  const { id } = req.params;
  const mpId = Number(id);
  const KEY = `mp_written_questions_${id}`;
  const cached = fromCache(KEY);
  if (cached) return res.json(cached);
  try {
    const all = await fetchAllWrittenQuestions();
    const filtered = all
      .filter((item) => (item.from ?? []).some((f) => Number(f) === mpId))
      .map((item) => ({
        num: item.num,
        title: item.title,
        receiptDate: item.receiptDate,
        sentDate: item.sentDate,
        to: item.to ?? [],
        answered: (item.replies ?? []).some((r) => !r.prolongation),
        answerDelayedDays: item.answerDelayedDays ?? 0,
        webUrl: (item.links ?? []).find((l) => l.rel === "web-description")?.href ?? null,
      }))
      .sort((a, b) => (b.receiptDate ?? "").localeCompare(a.receiptDate ?? ""));
    toCache(KEY, filtered, 10 * 60 * 1000);
    res.json(filtered);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch written questions", detail: err.message });
  }
}

const db = require("../db");
const { handleEvent } = require("../services/event.service");
const { checkAchievements } = require("../services/achievement.service");
const { incrementMetric } = require("../services/metrics.service");

const CLUB_METRIC = {
  "KO":              "club_rated_ko",
  "Lewica":          "club_rated_lewica",
  "Razem":           "club_rated_razem",
  "PSL-TD":          "club_rated_psl_td",
  "Polska2050":      "club_rated_polska2050",
  "PiS":             "club_rated_pis",
  "Konfederacja":    "club_rated_konfederacja",
  "Konfederacja_KP": "club_rated_konfederacja_kp",
  "Centrum":         "club_rated_centrum",
  "Demokracja":      "club_rated_demokracja",
}
const CLUBS_TOTAL = Object.keys(CLUB_METRIC).length; 

const COALITION_CLUBS = new Set(["KO", "PSL-TD", "Lewica", "Polska2050", "Centrum"]);

function clubRarity(count) {
  if (count >= 100) return { rarity: "legendary", xp: 2000 };
  if (count >= 50)  return { rarity: "epic",      xp: 800  };
  if (count >= 20)  return { rarity: "rare",      xp: 300  };
  return                   { rarity: "common",    xp: 100  };
}

async function initMpRatings() {
  try {

    await db.query(`
      INSERT IGNORE INTO achievements
        (id, slug, category_id, xp_reward, metric_key, metric_source, requirement_value, rarity, active, hidden)
      VALUES
        (70, 'mp_rated_1',   4, 15,   'mps_rated', 'users_metrics',   1, 'common',    1, 0),
        (71, 'mp_rated_10',  4, 75,   'mps_rated', 'users_metrics',  10, 'rare',      1, 0),
        (72, 'mp_rated_100', 4, 300,  'mps_rated', 'users_metrics', 100, 'epic',      1, 0),
        (73, 'mp_rated_all', 4, 1000, 'mps_rated', 'users_metrics', 460, 'legendary', 1, 0)
    `);

    await db.query(
      `INSERT INTO achievements
         (id, slug, category_id, xp_reward, metric_key, metric_source, requirement_value, rarity, active, hidden)
       VALUES (84, 'clubs_all_rated', 4, 500, 'clubs_rated_count', 'users_metrics', ?, 'epic', 1, 0)
       ON DUPLICATE KEY UPDATE
         requirement_value = VALUES(requirement_value),
         active = 1`,
      [CLUBS_TOTAL]
    );

    let sizes = {};
    let coalitionTotal = 0;
    let oppositionTotal = 0;
    try {
      const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/MP`, {
        headers: HEADERS,
        timeout: 20_000,
      });
      for (const mp of data) {
        if (mp.active === false || !mp.club) continue;
        if (CLUB_METRIC[mp.club]) sizes[mp.club] = (sizes[mp.club] || 0) + 1;
        if (COALITION_CLUBS.has(mp.club)) coalitionTotal++;
        else oppositionTotal++;
      }
    } catch (e) {
      console.warn("[mp_ratings] nie udało się pobrać rozmiarów klubów:", e.message);
    }

    const clubEntries = Object.entries(CLUB_METRIC);
    for (let i = 0; i < clubEntries.length; i++) {
      const [club, col] = clubEntries[i];
      const count = sizes[club] ?? 1;
      const slug  = col;
      const { rarity, xp } = clubRarity(count);
      const id = 74 + i;
      await db.query(
        `INSERT INTO achievements
           (id, slug, category_id, xp_reward, metric_key, metric_source, requirement_value, rarity, active, hidden)
         VALUES (?, ?, 4, ?, ?, 'users_metrics', ?, ?, 1, 0)
         ON DUPLICATE KEY UPDATE
           requirement_value = VALUES(requirement_value),
           xp_reward         = VALUES(xp_reward),
           rarity            = VALUES(rarity)`,
        [id, slug, xp, col, count, rarity]
      );
    }

    if (coalitionTotal > 0) {
      await db.query(
        `INSERT INTO achievements
           (id, slug, category_id, xp_reward, metric_key, metric_source, requirement_value, rarity, active, hidden)
         VALUES (85, 'coalition_all_rated', 4, 3000, 'coalition_rated', 'users_metrics', ?, 'legendary', 1, 0)
         ON DUPLICATE KEY UPDATE
           requirement_value = VALUES(requirement_value),
           xp_reward         = VALUES(xp_reward)`,
        [coalitionTotal]
      );
    }
    if (oppositionTotal > 0) {
      await db.query(
        `INSERT INTO achievements
           (id, slug, category_id, xp_reward, metric_key, metric_source, requirement_value, rarity, active, hidden)
         VALUES (86, 'opposition_all_rated', 4, 3000, 'opposition_rated', 'users_metrics', ?, 'legendary', 1, 0)
         ON DUPLICATE KEY UPDATE
           requirement_value = VALUES(requirement_value),
           xp_reward         = VALUES(xp_reward)`,
        [oppositionTotal]
      );
    }

    console.log("[mp_ratings] schema + achievements OK | kluby:", sizes,
      "| koalicja:", coalitionTotal, "| opozycja:", oppositionTotal);
  } catch (e) {
    console.warn("[mp_ratings] init error:", e.message);
  }
}
initMpRatings();

async function getMPRating(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const [[stats]] = await db.query(
      `SELECT ROUND(AVG(rating), 1) AS avg_rating, COUNT(*) AS count,
              SUM(rating = 1) AS s1, SUM(rating = 2) AS s2, SUM(rating = 3) AS s3,
              SUM(rating = 4) AS s4, SUM(rating = 5) AS s5
       FROM mp_ratings WHERE mp_id = ?`,
      [id]
    );

    let userRating = null;
    if (userId) {
      const [[row]] = await db.query(
        "SELECT rating FROM mp_ratings WHERE user_id = ? AND mp_id = ?",
        [userId, id]
      );
      userRating = row?.rating ?? null;
    }

    res.json({
      avgRating: stats.avg_rating ? Number(stats.avg_rating) : null,
      count: Number(stats.count),
      distribution: [1, 2, 3, 4, 5].map((s) => Number(stats[`s${s}`] ?? 0)),
      userRating,
    });
  } catch (e) {
    console.error("getMPRating error:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

async function rateMp(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const rating = Number(req.body.rating);
    const club = req.body.club ?? null;

    if (!userId) return res.status(401).json({ error: "Wymagane logowanie" });
    if (!Number.isInteger(rating) || rating < 1 || rating > 5)
      return res.status(400).json({ error: "Ocena musi być liczbą od 1 do 5" });

    const [[existing]] = await db.query(
      "SELECT id FROM mp_ratings WHERE user_id = ? AND mp_id = ?",
      [userId, id]
    );

    await db.query(
      `INSERT INTO mp_ratings (user_id, mp_id, rating, club) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating), updated_at = NOW()`,
      [userId, id, rating, club]
    );

    if (!existing) {
      const clubMetric = club ? CLUB_METRIC[club] : null;
      if (clubMetric) {
        const [[cur]] = await db.query(
          `SELECT COALESCE(${clubMetric}, 0) AS val FROM user_metrics WHERE user_id = ?`,
          [userId]
        );
        await incrementMetric(userId, clubMetric, 1);
        if (!cur || cur.val === 0) {
          await incrementMetric(userId, "clubs_rated_count", 1);
        }
      }
      if (club) {
        const side = COALITION_CLUBS.has(club) ? "coalition_rated" : "opposition_rated";
        await incrementMetric(userId, side, 1);
      }
      await handleEvent(userId, "MP_RATED");
    } else {
      await checkAchievements(userId);
    }

    const [[stats]] = await db.query(
      `SELECT ROUND(AVG(rating), 1) AS avg_rating, COUNT(*) AS count,
              SUM(rating = 1) AS s1, SUM(rating = 2) AS s2, SUM(rating = 3) AS s3,
              SUM(rating = 4) AS s4, SUM(rating = 5) AS s5
       FROM mp_ratings WHERE mp_id = ?`,
      [id]
    );

    res.json({
      avgRating: Number(stats.avg_rating),
      count: Number(stats.count),
      distribution: [1, 2, 3, 4, 5].map((s) => Number(stats[`s${s}`] ?? 0)),
      userRating: rating,
      isFirst: !existing,
    });
  } catch (e) {
    console.error("rateMp error:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

async function warmCache() {
  try {
    const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/MP`, {
      headers: HEADERS,
      timeout: 20_000,
    });
    const mps = data
      .filter((m) => m.active !== false)
      .map((m) => ({
        id: m.id,
        firstLastName: m.firstLastName,
        lastFirstName: m.lastFirstName,
        club: m.club,
        districtName: m.districtName,
        districtNum: m.districtNum,
        profession: m.profession ?? null,
        birthDate: m.birthDate ?? null,
        educationLevel: m.educationLevel ?? null,
      }))
      .sort((a, b) =>
        (a.lastFirstName ?? "").localeCompare(b.lastFirstName ?? "", "pl"),
      );
    toCache("all_mps", mps, 30 * 60 * 1000);
    console.log(`[cache] pre-warmed all_mps (${mps.length} posłów)`);
  } catch (e) {
    console.warn("[cache] warm failed:", e.message);
  }
}
warmCache();
cache.delete("committees_with_members");
cache.delete("committees_detailed");
cache.delete("all_interpellations");
cache.delete("all_written_questions");

module.exports = {
  getSejmLeadership,
  getSejmClubs,
  getSejmProceedings,
  getMPPhoto,
  getClubLogo,
  getAllMPs,
  getMPDetails,
  getMPVotings,
  getMPCommittees,
  getMPInterpellations,
  getMPWrittenQuestions,
  getMPRating,
  rateMp,
  warmupCommitteesCache:        fetchCommitteeData,
  warmupInterpellationsCache:   fetchAllInterpellations,
  warmupWrittenQuestionsCache:  fetchAllWrittenQuestions,
};

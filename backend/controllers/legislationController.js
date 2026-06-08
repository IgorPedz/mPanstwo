const axios = require("axios");
const db = require("../db");
const { handleEvent }       = require("../services/event.service");
const sendNotification      = require("../utils/notification");
const { checkAchievements } = require("../services/achievement.service");
const { incrementMetric }   = require("../services/metrics.service");

const SEJM_API = "https://api.sejm.gov.pl";
const TERM = "term10";
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" };

const cache = new Map();
function fromCache(key) {
  const e = cache.get(key);
  if (!e) return null;
  if (Date.now() > e.exp) { cache.delete(key); return null; }
  return e.data;
}
function toCache(key, data, ttlMs) {
  cache.set(key, { data, exp: Date.now() + ttlMs });
}

const APPLICANT_TYPE_MAP = {
  GOVERNMENT:  "rzadowy",
  DEPUTIES:    "poselski",
  SENATE:      "senacki",
  CITIZENS:    "obywatelski",
  PRESIDENT:   "prezydencki",
};

function mapType(applicantType) {
  return APPLICANT_TYPE_MAP[applicantType] ?? "inny";
}

async function fetchAllBillsRaw() {
  const PAGE = 200;
  const MAX_PAGES = 15;
  const seen = new Set();
  const all  = [];

  for (let page = 0; page < MAX_PAGES; page++) {
    const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/bills`, {
      headers: HEADERS,
      timeout: 30_000,
      params:  { offset: page * PAGE, limit: PAGE },
    });

    const items = data ?? [];
    if (!items.length) break;

    let newItems = 0;
    for (const b of items) {
      if (!seen.has(b.number)) {
        seen.add(b.number);
        all.push(b);
        newItems++;
      }
    }

    if (newItems === 0) break;
  }

  return all;
}

async function fetchAllBills() {
  const cached = fromCache("legislation_bills");
  if (cached) return cached;

  const raw = await fetchAllBillsRaw();

  const bills = raw
    .filter((b) => b.submissionType === "BILL" && b.status === "ACTIVE" && b.print)
    .map((b) => ({
      number:       String(b.print),
      billNumber:   b.number,
      title:        b.title,
      deliveryDate: b.dateOfReceipt ?? null,
      type:         mapType(b.applicantType),
      description:  b.description ?? null,
      euRelated:    b.euRelated ?? false,
      hasPDF:       true,
    }))
    .sort((a, b) => (b.deliveryDate ?? "").localeCompare(a.deliveryDate ?? ""));

  toCache("legislation_bills", bills, 30 * 60 * 1000);
  return bills;
}

function collectStages(stages = []) {
  const out = [];
  for (const s of stages) {
    out.push(s);
    if (s.childStages?.length) out.push(...collectStages(s.childStages));
  }
  return out;
}

function extractPrintNumbers(stages = []) {
  const nums = new Set();
  for (const s of stages) {
    if (s.printNumber) nums.add(String(s.printNumber));
    const nested = s.children ?? s.childStages ?? [];
    for (const n of extractPrintNumbers(nested)) nums.add(n);
  }
  return nums;
}

async function getBillVotings(req, res) {
  const { num } = req.params;
  const KEY = `bill_votings:${num}`;
  const cached = fromCache(KEY);
  if (cached) return res.json(cached);

  try {
    const found    = [];
    const foundKeys = new Set();

    function pushVoting(sitting, v) {
      const key = `${sitting}:${v.votingNumber}`;
      if (foundKeys.has(key)) return;
      foundKeys.add(key);
      found.push({
        sitting,
        votingNum:    v.votingNumber,
        date:         v.date ?? null,
        title:        v.title ?? null,
        topic:        v.topic ?? v.description ?? null,
        kind:         v.kind ?? null,
        majorityType: v.majorityType ?? null,
        majorityVotes: v.majorityVotes ?? null,
        yes:          v.yes ?? 0,
        no:           v.no ?? 0,
        abstain:      v.abstain ?? 0,
        notVoting:    v.notParticipating ?? 0,
        totalVoted:   v.totalVoted ?? 0,
      });
    }

    try {
      const { data: proc } = await axios.get(
        `${SEJM_API}/sejm/${TERM}/processes/${num}`,
        { headers: HEADERS, timeout: 10_000 }
      );

      for (const s of collectStages(proc?.stages ?? [])) {
        if (s.stageType === "Voting" && s.voting) {
          const v = s.voting;
          pushVoting(v.sitting, v);
        }
      }
    } catch {}

    found.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
    toCache(KEY, found, 30 * 60 * 1000);
    res.json(found);
  } catch (e) {
    console.error("getBillVotings:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

async function fetchMPsForVoting() {
  const cached = fromCache("v_mps");
  if (cached) return cached;
  const { data } = await axios.get(`${SEJM_API}/sejm/${TERM}/MP`, { headers: HEADERS, timeout: 20_000 });
  const mps = data.map(m => ({ id: m.id, club: m.club }));
  toCache("v_mps", mps, 30 * 60 * 1000);
  return mps;
}

async function fetchClubsForVoting() {
  const cached = fromCache("v_clubs");
  if (cached) return cached;
  const [{ data: list }, { data: allMPs }] = await Promise.all([
    axios.get(`${SEJM_API}/sejm/${TERM}/clubs`, { headers: HEADERS, timeout: 10_000 }),
    axios.get(`${SEJM_API}/sejm/${TERM}/MP`,    { headers: HEADERS, timeout: 10_000 }),
  ]);
  const counts = {};
  allMPs.filter(m => m.active !== false).forEach(m => { counts[m.club] = (counts[m.club] ?? 0) + 1; });
  const clubs = list.map(c => ({ id: c.id, membersCount: counts[c.id] ?? 0 }));
  toCache("v_clubs", clubs, 30 * 60 * 1000);
  return clubs;
}

async function getBillVotingDetail(req, res) {
  const { sitting, votNum } = req.params;
  const KEY = `voting_detail:${sitting}:${votNum}`;
  const cached = fromCache(KEY);
  if (cached) return res.json(cached);

  try {
    const [{ data: detail }, mps, clubs] = await Promise.all([
      axios.get(`${SEJM_API}/sejm/${TERM}/votings/${sitting}/${votNum}`, { headers: HEADERS, timeout: 15_000 }),
      fetchMPsForVoting(),
      fetchClubsForVoting(),
    ]);

    const mpById   = Object.fromEntries(mps.map(m => [m.id, m]));
    const clubSize = Object.fromEntries(clubs.map(c => [c.id, c.membersCount ?? 0]));

    function normalizeVote(v) {
      if (v === "YES" || v === "VOTE_VALID_1") return "yes";
      if (v === "NO"  || v === "VOTE_VALID_0") return "no";
      if (v === "ABSTAIN")                     return "abstain";
      return "notVoting";
    }

    const clubVotes = {};
    for (const vote of detail.votes ?? []) {
      const mp   = mpById[vote.MP];
      const club = mp?.club ?? "niez.";
      if (!clubVotes[club]) {
        clubVotes[club] = { club, totalMembers: clubSize[club] ?? 0, voted: 0, yes: 0, no: 0, abstain: 0, notVoting: 0 };
      }
      const c   = clubVotes[club];
      const key = normalizeVote(vote.vote);
      c[key]++;
      if (key !== "notVoting") c.voted++;
    }

    const clubRows = Object.values(clubVotes)
      .map(c => ({ ...c, notVoting: c.totalMembers > 0 ? c.totalMembers - c.voted : c.notVoting }))
      .sort((a, b) => b.totalMembers - a.totalMembers);

    const result = {
      sitting:       detail.sitting,
      votingNum:     detail.votingNumber,
      date:          detail.date,
      title:         detail.title,
      topic:         detail.topic ?? detail.description,
      kind:          detail.kind,
      majorityType:  detail.majorityType ?? null,
      majorityVotes: detail.majorityVotes ?? null,
      yes:        clubRows.reduce((s, c) => s + c.yes, 0),
      no:         clubRows.reduce((s, c) => s + c.no, 0),
      abstain:    clubRows.reduce((s, c) => s + c.abstain, 0),
      notVoting:  clubRows.reduce((s, c) => s + c.notVoting, 0),
      totalVoted: clubRows.reduce((s, c) => s + c.voted, 0),
      clubs:      clubRows,
    };

    toCache(KEY, result, 60 * 60 * 1000);
    res.json(result);
  } catch (e) {
    console.error("getBillVotingDetail:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

/* ── Kontrolery ──────────────────────────────────────────────────────────── */
async function getAllBills(req, res) {
  try {
    const { page = 0, limit = 20, search = "", type = "all" } = req.query;

    let bills = await fetchAllBills();

    if (type !== "all") bills = bills.filter((b) => b.type === type);
    if (search) {
      const q = search.toLowerCase();
      bills = bills.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          String(b.number).includes(q) ||
          b.description?.toLowerCase().includes(q)
      );
    }

    const total = bills.length;
    const p = Math.max(0, parseInt(page) || 0);
    const l = Math.min(50, Math.max(1, parseInt(limit) || 20));

    res.json({ items: bills.slice(p * l, (p + 1) * l), total, page: p, limit: l });
  } catch (e) {
    console.error("getAllBills:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

async function getBillDetails(req, res) {
  try {
    const { num } = req.params;
    const cacheKey = `bill_detail:${num}`;
    let bill = fromCache(cacheKey);

    if (!bill) {
      const { data: printData } = await axios.get(
        `${SEJM_API}/sejm/${TERM}/prints/${num}`,
        { headers: HEADERS, timeout: 15_000 }
      );

      const billsList = fromCache("legislation_bills") ?? [];
      const billMeta  = billsList.find((b) => b.number === String(num));

      bill = {
        ...printData,
        type:        billMeta ? billMeta.type        : null,
        description: billMeta ? billMeta.description : null,
        euRelated:   billMeta ? billMeta.euRelated   : false,
        billNumber:  billMeta ? billMeta.billNumber  : null,
      };
      toCache(cacheKey, bill, 60 * 60 * 1000);
    }
    res.json(bill);
  } catch (e) {
    console.error("getBillDetails:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

async function getLegislativeProcess(req, res) {
  try {
    const { num } = req.params;
    const cacheKey = `process:${num}`;
    let proc = fromCache(cacheKey);
    if (!proc) {
      try {
        const { data } = await axios.get(
          `${SEJM_API}/sejm/${TERM}/processes/${num}`,
          { headers: HEADERS, timeout: 15_000 }
        );
        proc = data;
        toCache(cacheKey, proc, 60 * 60 * 1000);
      } catch {
        return res.json(null);
      }
    }
    res.json(proc);
  } catch {
    res.json(null);
  }
}

const OPINIONS_SELECT = `
  SELECT
    lo.id,
    lo.user_id        AS author_id,
    lo.content,
    lo.created_at,
    lo.endorsed_by,
    lo.endorsed_at,
    u.name            AS author_name,
    u.role            AS author_role,
    r.name            AS rank_name,
    r.color           AS rank_color,
    r.level           AS rank_level,
    exp.name          AS endorser_name
  FROM legislation_opinions lo
  JOIN users u ON lo.user_id = u.id
  LEFT JOIN users exp ON exp.id = lo.endorsed_by
  LEFT JOIN ranks r ON r.id = (
    SELECT id FROM ranks
    WHERE required_xp <= u.xp
    ORDER BY required_xp DESC
    LIMIT 1
  )`;

async function getOpinions(req, res) {
  try {
    const { num } = req.params;
    const [rows] = await db.query(
      `${OPINIONS_SELECT} WHERE lo.print_num = ? ORDER BY lo.created_at DESC`,
      [num]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Błąd serwera" });
  }
}

async function postOpinion(req, res) {
  try {
    const { num } = req.params;
    const userId  = req.user?.id;
    const content = (req.body.content ?? "").trim();

    if (!userId)             return res.status(401).json({ error: "Wymagane logowanie" });
    if (!content)            return res.status(400).json({ error: "Treść nie może być pusta" });
    if (content.length > 2000)
      return res.status(400).json({ error: "Opinia zbyt długa (max 2000 znaków)" });

    await db.query(
      `INSERT INTO legislation_opinions (user_id, print_num, content) VALUES (?, ?, ?)`,
      [userId, num, content]
    );

    await handleEvent(userId, "OPINION_POSTED");

    const [rows] = await db.query(
      `${OPINIONS_SELECT} WHERE lo.print_num = ? ORDER BY lo.created_at DESC`,
      [num]
    );

    res.json({ success: true, opinions: rows });
  } catch (e) {
    console.error("postOpinion:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

/* ─── PUT /legislation/opinions/:id/endorse — ekspert weryfikuje opinię ──── */
async function endorseOpinion(req, res, next) {
  try {
    const expertId   = req.user?.id;
    const expertRole = req.user?.role;
    if (!expertId) return res.status(401).json({ error: "Wymagane logowanie" });
    if (expertRole !== "Ekspert") return res.status(403).json({ error: "Tylko eksperci mogą weryfikować opinie" });

    const opinionId = parseInt(req.params.id);

    const [[opinion]] = await db.query(
      "SELECT id, user_id, endorsed_by FROM legislation_opinions WHERE id = ?",
      [opinionId]
    );
    if (!opinion) return res.status(404).json({ error: "Opinia nie istnieje" });
    if (opinion.user_id === expertId) {
      return res.status(400).json({ error: "Nie możesz weryfikować własnej opinii" });
    }

    // Toggle: jeśli ten sam ekspert już zweryfikował → cofnij
    if (opinion.endorsed_by === expertId) {
      await db.query(
        "UPDATE legislation_opinions SET endorsed_by = NULL, endorsed_at = NULL WHERE id = ?",
        [opinionId]
      );
      return res.json({ endorsed: false });
    }

    // Zweryfikuj
    await db.query(
      "UPDATE legislation_opinions SET endorsed_by = ?, endorsed_at = NOW() WHERE id = ?",
      [expertId, opinionId]
    );

    // Powiadom autora opinii
    const [[expert]] = await db.query("SELECT name FROM users WHERE id = ?", [expertId]);
    sendNotification({
      type: "OPINION_ENDORSED",
      userId: opinion.user_id,
      data: { message: `Ekspert ${expert?.name ?? "ekspert"} uznał Twoją opinię za ważną!` },
    }).catch(() => {});

    // Metrika + achievement dla autora
    await incrementMetric(opinion.user_id, "opinions_endorsed", 1);
    await checkAchievements(opinion.user_id);

    res.json({ endorsed: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBills, getBillDetails, getLegislativeProcess,
  getOpinions, postOpinion,
  endorseOpinion,
  getBillVotings, getBillVotingDetail,
  warmupBillsCache: fetchAllBills,
};

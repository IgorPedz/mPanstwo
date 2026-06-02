const axios = require("axios");

const SEJM_API = "https://api.sejm.gov.pl";
const TERM     = "term10";

const HEADERS  = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" };

function norm(s) {
  return (s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Wyciąga imię i nazwisko z tytułu druku np:
// "Kandydat na stanowisko Marszałka Sejmu RP - poseł Jan Kowalski."
// "Kandydat na stanowisko Wicemarszałka Sejmu RP - poseł Anna Nowak."
function nameFromPrintTitle(title) {
  const m = title.match(/[-–]\s*pose[łl]\w*\s+(.+?)\s*\.?\s*$/i);
  return m ? m[1].trim() : null;
}

async function buildPrezydiumFromPrints(allMPs) {
  const [{ data: prints }, { data: proceedings }] = await Promise.all([
    axios.get(`${SEJM_API}/sejm/${TERM}/prints`,     { headers: HEADERS, timeout: 12_000 }),
    axios.get(`${SEJM_API}/sejm/${TERM}/proceedings`, { headers: HEADERS, timeout: 12_000 }),
  ]);

  // Druki z kandydaturami
  const electionPrints = prints
    .filter(p => /kandydat na stanowisko (wice)?marsza[łl]ka sejmu/i.test(p.title))
    .sort((a, b) => Number(a.number) - Number(b.number));

  // Druki z wnioskami o odwołanie
  const recallPrints = prints.filter(p => /wniosek o odwo.anie wicemar/i.test(p.title));
  const recalledNames = new Set(
    recallPrints.map(p => norm(nameFromPrintTitle(p.title) ?? "")).filter(Boolean)
  );

  // Mapowanie daty → numer posiedzenia
  const dateToProc = {};
  for (const proc of proceedings) {
    for (const d of (proc.dates ?? [])) dateToProc[d] = proc.number;
  }

  // Pobierz głosowania dla posiedzeń z wyborami (jeden fetch per posiedzenie)
  const procNums = [...new Set(
    electionPrints.map(p => dateToProc[p.deliveryDate]).filter(Boolean)
  )];
  const votingsByProc = {};
  await Promise.all(procNums.map(async num => {
    try {
      const { data } = await axios.get(
        `${SEJM_API}/sejm/${TERM}/votings/${num}`,
        { headers: HEADERS, timeout: 8_000 }
      );
      votingsByProc[num] = data;
    } catch { votingsByProc[num] = []; }
  }));

  // Budujemy skład weryfikując wyniki głosowań
  let marshal = null;
  const deputies = new Map();

  for (const p of electionPrints) {
    const rawName = nameFromPrintTitle(p.title);
    if (!rawName) continue;

    const isMarszalek = /stanowisko Marsza[łl]ka Sejmu/i.test(p.title) &&
                        !/Wicemarsza/i.test(p.title);

    // Dopasuj posła
    const mp = allMPs.find(m => {
      const full = norm(`${m.firstName} ${m.lastName}`);
      return norm(rawName).split(" ").every(w => w.length > 1 && full.includes(w));
    });
    if (!mp) continue;

    // Sprawdź wynik głosowania
    const procNum = dateToProc[p.deliveryDate];
    if (procNum) {
      const votes = votingsByProc[procNum] ?? [];
      const normName = norm(rawName);
      const vote = votes.find(v => {
        const topic = norm(v.topic ?? v.title ?? "");
        return normName.split(" ").some(w => w.length > 2 && topic.includes(w));
      });
      // Kandydat przegrał głosowanie — pomijamy
      if (vote && vote.yes !== undefined && vote.yes <= (vote.no ?? 0)) continue;
    }

    if (isMarszalek) {
      deputies.delete(norm(rawName)); // awans z Wicemarszałka
      marshal = { mp };
    } else {
      deputies.set(norm(rawName), { mp });
    }
  }

  // Usuń odwołanych
  for (const recalled of recalledNames) {
    for (const key of deputies.keys()) {
      if (key.includes(recalled) || recalled.includes(key)) deputies.delete(key);
    }
  }

  const result = [];
  if (marshal) {
    result.push({
      id:    marshal.mp.id,
      name:  `${marshal.mp.firstName} ${marshal.mp.lastName}`,
      title: "Marszałek Sejmu RP",
      role:  "marszalek",
      club:  marshal.mp.club,
      photo: `${SEJM_API}/sejm/${TERM}/MP/${marshal.mp.id}/photo`,
    });
  }
  for (const { mp } of deputies.values()) {
    result.push({
      id:    mp.id,
      name:  `${mp.firstName} ${mp.lastName}`,
      title: "Wicemarszałek Sejmu RP",
      role:  "wicemarszalek",
      club:  mp.club,
      photo: `${SEJM_API}/sejm/${TERM}/MP/${mp.id}/photo`,
    });
  }
  return result;
}

/* ── Kierownictwo ────────────────────────────────────────────────────────── */
async function getSejmLeadership(req, res) {
  try {
    const { data: allMPs } = await axios.get(
      `${SEJM_API}/sejm/${TERM}/MP`,
      { headers: HEADERS, timeout: 10_000 }
    );

    const people = await buildPrezydiumFromPrints(allMPs);
    res.json(people);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch Sejm leadership", detail: err.message });
  }
}

/* ── Kluby parlamentarne ─────────────────────────────────────────────────── */
async function getSejmClubs(req, res) {
  try {
    // Pobieramy listę klubów (nazwy) i wszystkich AKTYWNYCH posłów równolegle
    const [{ data: list }, { data: allMPs }] = await Promise.all([
      axios.get(`${SEJM_API}/sejm/${TERM}/clubs`,  { headers: HEADERS, timeout: 10_000 }),
      axios.get(`${SEJM_API}/sejm/${TERM}/MP`,     { headers: HEADERS, timeout: 10_000 }),
    ]);

    // membersCount w API listy jest błędny (zawsze 12)
    // Zliczamy aktywnych posłów per klub z endpointu /MP
    const activeCounts = {};
    allMPs
      .filter(m => m.active !== false)
      .forEach(m => { activeCounts[m.club] = (activeCounts[m.club] ?? 0) + 1; });

    const clubs = list.map(c => ({
      id:           c.id,
      name:         c.name,
      membersCount: activeCounts[c.id] ?? 0,
    }));

    res.json(clubs);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch Sejm clubs", detail: err.message });
  }
}

/* ── Ostatnie posiedzenia ────────────────────────────────────────────────── */
async function getSejmProceedings(req, res) {
  try {
    const { data } = await axios.get(
      `${SEJM_API}/sejm/${TERM}/proceedings`,
      { headers: HEADERS, timeout: 10_000 }
    );

    const today = new Date().toISOString().slice(0, 10);

    const sorted = [...data]
      .sort((a, b) => b.number - a.number)
      .slice(0, 10)
      .map(p => ({
        number:   p.number,
        title:    `${p.number}. Posiedzenie Sejmu RP`,
        dates:    p.dates ?? [],
        date:     p.dates?.[0] ?? "",
        upcoming: p.current === true || (p.dates?.[0] ?? "") > today,
      }));

    res.json(sorted);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch proceedings", detail: err.message });
  }
}

/* ── Proxy zdjęcia posła ─────────────────────────────────────────────────── */
async function getMPPhoto(req, res) {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${SEJM_API}/sejm/${TERM}/MP/${id}/photo`,
      { headers: HEADERS, responseType: "arraybuffer", timeout: 8_000 }
    );
    res.set("Content-Type", response.headers["content-type"] || "image/jpeg");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(response.data);
  } catch {
    res.status(404).end();
  }
}

/* ── Proxy logo klubu ────────────────────────────────────────────────────── */
async function getClubLogo(req, res) {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `${SEJM_API}/sejm/${TERM}/clubs/${encodeURIComponent(id)}/logo`,
      { headers: HEADERS, responseType: "arraybuffer", timeout: 8_000 }
    );
    res.set("Content-Type", response.headers["content-type"] || "image/png");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(response.data);
  } catch {
    res.status(404).end();
  }
}

module.exports = { getSejmLeadership, getSejmClubs, getSejmProceedings, getMPPhoto, getClubLogo };

const axios = require("axios");
const db = require("../db");
const { handleEvent } = require("../services/event.service");

const SEJM_API = "https://api.sejm.gov.pl";
const TERM = "term10";
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" };

/* ── Cache ───────────────────────────────────────────────────────────────── */
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

/* ── Helpers ─────────────────────────────────────────────────────────────── */
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
      // Pobierz dane druku z API Sejmu
      const { data: printData } = await axios.get(
        `${SEJM_API}/sejm/${TERM}/prints/${num}`,
        { headers: HEADERS, timeout: 15_000 }
      );

      // Uzupełnij o dane z /bills (opis, wnioskodawca) jeśli dostępne w cache
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

async function getOpinions(req, res) {
  try {
    const { num } = req.params;
    const [rows] = await db.query(
      `SELECT
         lo.id,
         lo.content,
         lo.created_at,
         u.name  AS author_name,
         u.role  AS author_role,
         r.name  AS rank_name,
         r.color AS rank_color,
         r.level AS rank_level
       FROM legislation_opinions lo
       JOIN users u ON lo.user_id = u.id
       LEFT JOIN ranks r ON r.id = (
         SELECT id FROM ranks
         WHERE required_xp <= u.xp
         ORDER BY required_xp DESC
         LIMIT 1
       )
       WHERE lo.print_num = ?
       ORDER BY lo.created_at DESC`,
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
      `SELECT
         lo.id,
         lo.content,
         lo.created_at,
         u.name  AS author_name,
         u.role  AS author_role,
         r.name  AS rank_name,
         r.color AS rank_color,
         r.level AS rank_level
       FROM legislation_opinions lo
       JOIN users u ON lo.user_id = u.id
       LEFT JOIN ranks r ON r.id = (
         SELECT id FROM ranks
         WHERE required_xp <= u.xp
         ORDER BY required_xp DESC
         LIMIT 1
       )
       WHERE lo.print_num = ?
       ORDER BY lo.created_at DESC`,
      [num]
    );

    res.json({ success: true, opinions: rows });
  } catch (e) {
    console.error("postOpinion:", e.message);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

module.exports = { getAllBills, getBillDetails, getLegislativeProcess, getOpinions, postOpinion };

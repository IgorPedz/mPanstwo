/**
 * Scrapes current ministry leadership from gov.pl and updates
 * frontend/src/data/ministriesData.js
 *
 * Usage (run from project root or backend/):
 *   node backend/update-leadership.js             — all ministries
 *   node backend/update-leadership.js edukacja    — single ministry (gov.pl slug)
 *
 * Cron example — every Monday at 06:00:
 *   0 6 * * 1  cd /path/to/mPanstwo && node backend/update-leadership.js >> logs/leadership.log 2>&1
 */

const axios   = require("axios");
const cheerio = require("cheerio");
const fs      = require("fs");
const path    = require("path");

const BASE_URL  = "https://www.gov.pl";
const DATA_FILE = path.resolve(__dirname, "../frontend/src/data/ministriesData.js");
const DELAY_MS  = 1200;

/* ── ministry data key → { govSlug, leadershipPath } ──────────────────── */
// Most use /kierownictwo-ministerstwa, some use /kierownictwo
const MINISTRY_MAP = {
  ministry_of_finance:                             { s: "finanse",           p: "kierownictwo" },
  ministry_of_health:                              { s: "zdrowie",           p: "kierownictwo" },
  ministry_of_national_defence:                    { s: "obrona-narodowa",   p: "kierownictwo" },
  ministry_of_justice:                             { s: "sprawiedliwosc",    p: "kierownictwo-ministerstwa" },
  ministry_of_foreign_affairs:                     { s: "dyplomacja",        p: "kierownictwo-ministerstwa" },
  ministry_of_infrastructure:                      { s: "infrastruktura",    p: "kierownictwo-ministerstwa" },
  ministry_of_agriculture:                         { s: "rolnictwo",         p: "kierownictwo-ministerstwa" },
  ministry_of_climate_and_environment:             { s: "klimat",            p: "kierownictwo-ministerstwa" },
  ministry_of_state_assets:                        { s: "aktywa-panstwowe",  p: "kierownictwo-ministerstwa" },
  ministry_of_culture_and_national_heritage:       { s: "kultura",           p: "kierownictwo-ministerstwa" },
  ministry_of_sport_and_tourism:                   { s: "sport",             p: "kierownictwo-ministerstwa" },
  ministry_of_family_labour_and_social_policy:     { s: "rodzina",           p: "kierownictwo" },
  ministry_of_energy:                              { s: "energia",           p: "kierownictwo" },
  ministry_of_education:                           { s: "edukacja",          p: "kierownictwo-ministerstwa" },
  ministry_of_funds_and_regional_policy:           { s: "fundusze-regiony",  p: "kierownictwo-ministerstwa" },
  ministry_of_science_and_higher_education:        { s: "nauka",             p: "kierownictwo-ministerstwa" },
  ministry_of_internal_affairs_and_administration: { s: "mswia",             p: "kierownictwo-mswia" },
  ministry_of_digital_affairs:                     { s: "cyfryzacja",        p: "kierownictwo" },

  // Instytucje rządowe (nie-ministerstwa)
  chancellery_of_the_prime_minister: { s: "premier", p: "kierownictwo-kprm5" },
  council_of_ministers:              { s: "premier", p: "sklad-rady-ministrow" },
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ── Fetch + parse one ministry's leadership page ──────────────────────── */
async function scrapeLeadership(govSlug, leadershipPath) {
  const url = `${BASE_URL}/web/${govSlug}/${leadershipPath}`;

  let html;
  try {
    const res = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo-scraper/1.0)" },
      timeout: 10_000,
    });
    html = res.data;
  } catch (err) {
    console.warn(`  ⚠  ${govSlug}: fetch failed — ${err.message}`);
    return null;
  }

  const $      = cheerio.load(html);
  const people = [];

  $(".bio-prev li").each((i, el) => {
    const name  = $(el).find(".title a").text().trim();
    const title = $(el).find(".position, .intro").text().trim();

    if (!name) return;

    // Official gov.pl photo URL (from <picture><img>)
    const imgSrc = $(el).find("picture img").attr("src") || "";
    const photo  = imgSrc
      ? (imgSrc.startsWith("http") ? imgSrc : `${BASE_URL}${imgSrc}`)
      : null;

    // Profile URL (from .title a href)
    const href       = $(el).find(".title a").attr("href") || "";
    const profileUrl = href
      ? (href.startsWith("http") ? href : `${BASE_URL}${href}`)
      : null;

    // Determine role
    const titleLower = title.toLowerCase();
    let role;
    if (i === 0) {
      role = "minister";
    } else if (titleLower.includes("dyrektor generalny")) {
      role = "dyrektor_generalny";
    } else {
      role = "wiceminister";
    }

    people.push({
      name,
      title,
      role,
      ...(photo      ? { photo }      : {}),
      ...(profileUrl ? { profileUrl } : {}),
    });
  });

  return people.length > 0 ? people : null;
}

/* ── Serialise one person object to JS source ───────────────────────────── */
function serializePerson(p) {
  const photoLine      = p.photo      ? `\n        photo: "${p.photo}",`           : "";
  const profileUrlLine = p.profileUrl ? `\n        profileUrl: "${p.profileUrl}",` : "";
  return `      { name: "${p.name}", title: "${p.title}", role: "${p.role}",${photoLine}${profileUrlLine} }`;
}

/* ── Replace the leadership array for one key in the source text ─────────
   Walks through characters to find the exact matching brackets, so it is
   immune to nested arrays or objects inside the leadership entries.        */
function patchLeadership(source, dataKey, people) {
  const blockStart = source.indexOf(`${dataKey}:`);
  if (blockStart === -1) {
    console.warn(`  ⚠  key "${dataKey}" not found — skipping`);
    return source;
  }

  const leadershipIdx = source.indexOf("leadership:", blockStart);
  if (leadershipIdx === -1) return source;

  const arrayOpen = source.indexOf("[", leadershipIdx);
  let depth = 0;
  let i = arrayOpen;
  while (i < source.length) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") { depth--; if (depth === 0) break; }
    i++;
  }
  // Consume optional trailing comma + whitespace
  const trailingComma = source.slice(i + 1).match(/^(\s*,)?/)[0];
  const end = i + 1 + trailingComma.length;

  const newBlock = `leadership: [\n${people.map(serializePerson).join(",\n")},\n    ],`;
  return source.slice(0, leadershipIdx) + newBlock + source.slice(end);
}

/* ── Main ────────────────────────────────────────────────────────────────── */
async function main() {
  const filterSlug = process.argv[2];

  const targets = Object.entries(MINISTRY_MAP).filter(
    ([, { s }]) => !filterSlug || s === filterSlug
  );

  if (targets.length === 0) {
    console.error(`Unknown slug: "${filterSlug}"\nAvailable: ${Object.values(MINISTRY_MAP).map(v => v.s).join(", ")}`);
    process.exit(1);
  }

  console.log(`Updating ${targets.length} ministr${targets.length === 1 ? "y" : "ies"}…\n`);

  let source  = fs.readFileSync(DATA_FILE, "utf-8");
  let updated = 0;

  for (const [dataKey, { s: govSlug, p: leadershipPath }] of targets) {
    process.stdout.write(`→ ${dataKey.replace("ministry_of_", "")} `);
    const people = await scrapeLeadership(govSlug, leadershipPath);

    if (!people) {
      console.log("✗ skipped");
    } else {
      source = patchLeadership(source, dataKey, people);
      console.log(`✓  ${people.map(p => p.name).join(", ")}`);
      updated++;
    }

    if (targets.length > 1) await sleep(DELAY_MS);
  }

  fs.writeFileSync(DATA_FILE, source, "utf-8");
  console.log(`\n✅  Done — ${updated}/${targets.length} updated.`);
}

// Wywołanie bezpośrednie: node backend/update-leadership.js [govSlug]
if (require.main === module) {
  main().catch(err => {
    console.error("Fatal:", err.message);
    process.exit(1);
  });
}

// Wywołanie z serwera (cron)
module.exports = { runLeadershipUpdate: main };

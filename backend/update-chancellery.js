const axios   = require("axios");
const cheerio = require("cheerio");
const fs      = require("fs");
const path    = require("path");

const BASE_URL  = "https://www.prezydent.pl";
const LIST_URL  = `${BASE_URL}/kancelaria/kierownictwo-kancelarii/`;
const DATA_FILE = path.resolve(__dirname, "../frontend/src/data/ministriesData.js");
const DELAY_MS  = 800;

const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo-scraper/1.0)" };

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getProfileLinks() {
  const res  = await axios.get(LIST_URL, { headers: HEADERS, timeout: 10_000 });
  const $    = cheerio.load(res.data);
  const seen = new Set();
  const links = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    const abs  = href.startsWith("http") ? href : `${BASE_URL}${href}`;

    const isKierownictwo = abs.includes("/kierownictwo-kancelarii/") &&
      !abs.endsWith("/kierownictwo-kancelarii/") &&
      !abs.includes("-historia") &&
      !abs.includes("/archiwum/");

    const isBBN = abs.includes("/kierownictwo-bbn/") &&
      !abs.endsWith("/kierownictwo-bbn/") &&
      !abs.includes("/archiwum/");

    if ((isKierownictwo || isBBN) && !seen.has(abs)) {
      seen.add(abs);
      links.push(abs);
    }
  });

  return links;
}

async function scrapeProfile(url) {
  let res;
  try {
    res = await axios.get(url, { headers: HEADERS, timeout: 10_000 });
  } catch (err) {
    console.warn(`  ⚠  ${url}: ${err.message}`);
    return null;
  }

  const $ = cheerio.load(res.data);

  const name = $("h1.page-title, h1").first().text().trim();
  if (!name) return null;

  let photo = null;
  $("img").each((_, el) => {
    if (photo) return;
    const src = $(el).attr("src") || "";
    if (src.includes("storage/image") && !src.includes("logo")) photo = src;
  });

  let title = $('meta[name="description"]').attr("content")?.trim() || "";
  if (!title || title.length > 200) title = "";

  if (!title) {
    $("p").each((_, el) => {
      if (title) return;
      const t = $(el).text().trim();
      if (
        t.length > 4 && t.length < 150 &&
        /^(szef|minister|sekretarz|podsekretarz|dyrektor|zastępca|doradca|koordynator|rzecznik)/i.test(t)
      ) {
        title = t;
      }
    });
  }

  if (!title) {
    $("p").each((_, el) => {
      if (title) return;
      const t = $(el).text().trim();
      if (!/prezydent|kprp|kancelarii prezydenta/i.test(t)) return;
      const m = t.match(/stanowisko\s+(.{5,150})(?:\.|$)/i);
      if (m) {
        title = m[1].trim()
          .replace(/\bDyrektora\b/g, "Dyrektor")
          .replace(/\bGeneralnego\b/g, "Generalny")
          .replace(/\bMinistra\b/g, "Minister")
          .replace(/\bSekretarza\b/g, "Sekretarz")
          .replace(/\bPodsekretarza\b/g, "Podsekretarz")
          .replace(/\s+w\s+KPRP.*$/i, "")
          .replace(/\.$/, "")
          .trim();
      }
    });
  }

  return { name, photo, title, profileUrl: url };
}

function serializePerson(p) {
  const photoLine      = p.photo      ? `\n        photo: "${p.photo}",`           : "\n        photo: null,";
  const profileUrlLine = p.profileUrl ? `\n        profileUrl: "${p.profileUrl}",` : "";
  return `      { name: "${p.name}", title: "${p.title}", role: "${p.role}",${photoLine}${profileUrlLine} }`;
}

function patchLeadership(source, dataKey, people) {
  const blockStart     = source.indexOf(`${dataKey}:`);
  if (blockStart === -1) return source;

  const leadershipIdx  = source.indexOf("leadership:", blockStart);
  if (leadershipIdx === -1) return source;

  const arrayOpen = source.indexOf("[", leadershipIdx);
  let depth = 0, i = arrayOpen;
  while (i < source.length) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") { depth--; if (depth === 0) break; }
    i++;
  }
  const trailingComma = source.slice(i + 1).match(/^(\s*,)?/)[0];
  const end = i + 1 + trailingComma.length;

  const newBlock = `leadership: [\n${people.map(serializePerson).join(",\n")},\n    ],`;
  return source.slice(0, leadershipIdx) + newBlock + source.slice(end);
}


async function runChancelleryUpdate() {
  console.log("Aktualizacja kierownictwa Kancelarii Prezydenta RP…\n");

  let profileLinks;
  try {
    profileLinks = await getProfileLinks();
  } catch (err) {
    console.error("Błąd pobierania listy:", err.message);
    return;
  }

  console.log(`Znaleziono ${profileLinks.length} profil(i).\n`);

  const people = [];
  const seenNames = new Set();

  for (const [idx, url] of profileLinks.entries()) {
    const slug = url.split("/").pop();
    process.stdout.write(`→ ${slug} `);

    const person = await scrapeProfile(url);
    if (!person) { console.log("✗ pominięto"); continue; }
    if (seenNames.has(person.name)) { console.log("✗ duplikat"); continue; }
    seenNames.add(person.name);

    person.role = people.length === 0 ? "minister" : "wiceminister";
    people.push(person);
    console.log(`✓  ${person.name}`);

    if (idx < profileLinks.length - 1) await sleep(DELAY_MS);
  }

  if (people.length === 0) {
    console.error("\n✗  Nie pobrano żadnych danych.");
    return;
  }

  let source = fs.readFileSync(DATA_FILE, "utf-8");
  source = patchLeadership(source, "presidential_chancellery", people);
  fs.writeFileSync(DATA_FILE, source, "utf-8");

  console.log(`\n✅  Done — ${people.length} osób zapisano.`);
}

if (require.main === module) {
  runChancelleryUpdate().catch(err => {
    console.error("Fatal:", err.message);
    process.exit(1);
  });
}

module.exports = { runChancelleryUpdate };

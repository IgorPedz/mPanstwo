/**
 * Scrapes current president data from prezydent.pl and updates
 * frontend/src/data/presidentData.js
 *
 * Usage (run from project root or backend/):
 *   node backend/update-president.js
 *
 * Sources (in order):
 *   1. prezydent.pl/prezydent/biografia
 *   2. Wikipedia API (fallback for photo + name)
 */

const axios   = require("axios");
const cheerio = require("cheerio");
const fs      = require("fs");
const path    = require("path");

const DATA_FILE = path.resolve(__dirname, "../frontend/src/data/presidentData.js");
const BASE_URL  = "https://www.prezydent.pl";

const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo-scraper/1.0)" };

async function scrapeOfficialBio() {
  const url = `${BASE_URL}/prezydent/biografia`;

  let html;
  try {
    const res = await axios.get(url, { headers: HEADERS, timeout: 10_000 });
    html = res.data;
  } catch (err) {
    console.warn(`  ⚠  prezydent.pl niedostępny: ${err.message}`);
    return null;
  }

  const $ = cheerio.load(html);

  const rawName = [
    $("h1").first().text().trim(),
    $("[class*='president-name'], [class*='presidenta'], [class*='name']").first().text().trim(),
    $(".page-title, .article-title").first().text().trim(),
  ].find(t => t.length > 2 && t.length < 120) || null;

  const name = rawName
    ? rawName
        .replace(/^(Prof\.|Dr\.?|mgr\.?|inż\.?)\s+/i, "")   
        .replace(/\s*[–—-].*$/, "")                           
        .trim()
    : null;

  const rawPhoto =
    $(".biography img, [class*='photo'] img, [class*='portret'] img, .article-img img, main article img, .page-content img")
      .first()
      .attr("src") ||
    $(".biography img, [class*='photo'] img, main img").first().attr("data-src") ||
    $("picture source").first().attr("srcset")?.split(" ")[0] ||
    "";
  const photo = rawPhoto
    ? (rawPhoto.startsWith("http") ? rawPhoto : `${BASE_URL}${rawPhoto}`)
    : null;

  const paragraphs = [];
  $(".biography p, .biography-content p, .article-content p, .content p, main article p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 80) paragraphs.push(text);
  });
  const description = paragraphs.length
    ? paragraphs.slice(0, 2).join(" ").replace(/\s+/g, " ").slice(0, 600)
    : null;

  const profileUrl = `${BASE_URL}/prezydent/biografia`;

  return { name, photo, description, profileUrl };
}

async function scrapeWikipedia() {
  try {
    const searchParams = new URLSearchParams({
      action:   "query",
      list:     "search",
      srsearch: "Prezydent Rzeczypospolitej Polskiej aktualny",
      format:   "json",
      origin:   "*",
    });

    const overviewParams = new URLSearchParams({
      action:        "query",
      titles:        "Prezydent Rzeczypospolitej Polskiej",
      prop:          "revisions",
      rvprop:        "content",
      rvslots:       "main",
      rvsection:     "0",
      format:        "json",
      origin:        "*",
    });

    const overviewRes = await axios.get(`https://pl.wikipedia.org/w/api.php?${overviewParams}`, {
      headers: HEADERS,
      timeout: 10_000,
    });

    const pages   = overviewRes.data?.query?.pages ?? {};
    const content = Object.values(pages)[0]?.revisions?.[0]?.slots?.main?.["*"] ?? "";

    let presidentName = null;

    const nameMatch =
      content.match(/Prezydentem RP jest \[\[([^\]|]+)/i) ||
      content.match(/\[\[([A-ZŁŚŻŹĆĄĘÓŃ][a-złśżźćąęóń]+ [A-ZŁŚŻŹĆĄĘÓŃ][a-złśżźćąęóń]+)\]\].*prezydent/i);

    if (nameMatch) presidentName = nameMatch[1].trim();

    if (!presidentName) {
      console.warn("  ⚠  Nie udało się ustalić imienia prezydenta z Wikipedii");
      return null;
    }

    const bioParams = new URLSearchParams({
      action:        "query",
      titles:        presidentName,
      prop:          "pageimages|extracts",
      exintro:       "true",
      explaintext:   "true",
      pithumbsize:   "600",
      format:        "json",
      origin:        "*",
    });

    const bioRes = await axios.get(`https://pl.wikipedia.org/w/api.php?${bioParams}`, {
      headers: HEADERS,
      timeout: 10_000,
    });

    const bioPages = bioRes.data?.query?.pages ?? {};
    const bioPage  = Object.values(bioPages)[0];

    const photo       = bioPage?.thumbnail?.source ?? null;
    const fullExtract = (bioPage?.extract ?? "").replace(/\s+/g, " ").trim();
    const description = fullExtract.slice(0, 600) || null;

    return {
      name:       presidentName,
      photo,
      description,
      profileUrl: `https://pl.wikipedia.org/wiki/${encodeURIComponent(presidentName)}`,
    };
  } catch (err) {
    console.warn(`  ⚠  Wikipedia fetch failed: ${err.message}`);
    return null;
  }
}

function escapeForJs(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

function patchField(source, jsKey, value) {
  if (!value) return source;
  const escaped = escapeForJs(value);
  const regex = new RegExp(`(${jsKey}:\\s*)(?:"[^"]*"|null)`, "g");
  return source.replace(regex, `$1"${escaped}"`);
}

function patchDescription(source, description) {
  if (!description) return source;
  const escaped = escapeForJs(description);
  return source.replace(
    /description:\s*(?:"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/,
    `description: "${escaped}"`
  );
}

async function runPresidentUpdate() {
  console.log("Aktualizacja danych prezydenta…");

  let data = await scrapeOfficialBio();

  if (!data || (!data.name && !data.photo)) {
    console.log("  → Fallback: Wikipedia API");
    data = await scrapeWikipedia();
  } else if (!data.photo) {
    const wikiData = await scrapeWikipedia();
    if (wikiData?.photo) data.photo = wikiData.photo;
    if (!data.name && wikiData?.name) data.name = wikiData.name;
    if (!data.description && wikiData?.description) data.description = wikiData.description;
  }

  if (!data) {
    console.error("✗  Nie udało się pobrać żadnych danych.");
    return;
  }

  let source = fs.readFileSync(DATA_FILE, "utf-8");

  source = patchField(source, "name",       data.name);
  source = patchField(source, "photo",      data.photo);
  source = patchField(source, "profileUrl", data.profileUrl);
  if (data.description) source = patchDescription(source, data.description);

  fs.writeFileSync(DATA_FILE, source, "utf-8");

  console.log(`✅  Done:`);
  if (data.name)        console.log(`   Imię:    ${data.name}`);
  if (data.photo)       console.log(`   Zdjęcie: ${data.photo}`);
  if (data.description) console.log(`   Opis:    ${data.description.slice(0, 80)}…`);
}

if (require.main === module) {
  runPresidentUpdate().catch(err => {
    console.error("Fatal:", err.message);
    process.exit(1);
  });
}

module.exports = { runPresidentUpdate };

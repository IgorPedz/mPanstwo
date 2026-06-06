const axios = require("axios");

const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" };

/* ── Pomocnik: usuwa HTML tagi i dekoduje encje ──────────────────────────── */
function stripHtml(str) {
  return (str ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").replace(/&#x[0-9a-f]+;/gi, c => String.fromCodePoint(parseInt(c.slice(3,-1),16)))
    .replace(/&#\d+;/g, c => String.fromCodePoint(parseInt(c.slice(2,-1))))
    .trim();
}

/* ── Pomocnik: format daty z RSS (RFC 822) → DD.MM.YYYY ──────────────────── */
function rfcToDisplay(rfcDate) {
  try {
    const d = new Date(rfcDate);
    return d.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch { return ""; }
}

/* ── Trybunał Konstytucyjny ───────────────────────────────────────────────── */
async function scrapeTKNews() {
  try {
    const { data: html } = await axios.get("https://trybunal.gov.pl", { headers: HEADERS, timeout: 12_000 });
    const items = [];
    const re = /<a\s+href="(\/postepowanie-i-orzeczenia\/[^"]+)"\s+title="([^"]+)"[^>]*>[\s\S]{0,300}?<div class="widget-subtitle">([^<]+)<\/div>/g;
    let m;
    while ((m = re.exec(html)) !== null && items.length < 8) {
      const [, path, title, subtitle] = m;
      const parts = subtitle.split(",");
      items.push({ title: stripHtml(title), lead: parts[0]?.trim() ?? "", date: parts[1]?.trim() ?? "", url: `https://trybunal.gov.pl${path}`, image: null });
    }
    if (items.length === 0) throw new Error("no items");
    return items;
  } catch { return []; }
}

/* ── Naczelny Sąd Administracyjny ────────────────────────────────────────── */
async function scrapeNSANews() {
  try {
    const { data: html } = await axios.get("https://www.nsa.gov.pl/aktualnosci/", { headers: HEADERS, timeout: 12_000 });
    const titles = [...html.matchAll(/<h3[^>]*h3_aktualnosci[^>]*>([\s\S]{5,200}?)<\/h3>/g)].map(m => stripHtml(m[1]));
    const dates  = [...html.matchAll(/<span class="wydarzenie">([\s\S]{3,50}?)<\/span>/g)].map(m => m[1].trim());
    const urls   = [...html.matchAll(/data-url="(https:\/\/www\.nsa\.gov\.pl\/[^"]+)"/g)].map(m => m[1]);
    const imgs   = [...html.matchAll(/class="[^"]*autorFoto[^"]*"[^>]*>[\s\S]{0,300}?src="([^"]+)"/g)].map(m => m[1]);
    const items  = titles.slice(0, 8).map((title, i) => ({
      title, lead: null, date: dates[i] ?? "",
      url:   urls[i]  ?? "https://www.nsa.gov.pl/aktualnosci/",
      image: imgs[i]  ? (imgs[i].startsWith("http") ? imgs[i] : `https://www.nsa.gov.pl${imgs[i]}`) : null,
    }));
    if (items.length === 0) throw new Error("no items");
    return items;
  } catch { return []; }
}

/* ── Krajowa Rada Sądownictwa ────────────────────────────────────────────── */
async function scrapeKRSNews() {
  try {
    const { data: xml } = await axios.get("https://www.krs.pl/pl/aktualnosci.feed?type=rss", { headers: HEADERS, timeout: 12_000 });
    const items = [];
    const re = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = re.exec(xml)) !== null && items.length < 8) {
      const block   = m[1];
      const title   = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1] ?? "";
      const link    = block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "";
      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "";
      const desc    = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)?.[1] ?? "";
      const img     = desc.match(/src="([^"]+\.(?:png|jpg|jpeg|webp)[^"]*)"/i)?.[1] ?? null;
      items.push({
        title: stripHtml(title), lead: stripHtml(desc).slice(0, 150) || null,
        date: rfcToDisplay(pubDate), url: link.trim(),
        image: img ? (img.startsWith("http") ? img : `https://www.krs.pl${img}`) : null,
      });
    }
    if (items.length === 0) throw new Error("no items");
    return items;
  } catch { return []; }
}

/* ── Sąd Najwyższy ───────────────────────────────────────────────────────── */
async function scrapeSNNews() {
  try {
    const { data: html } = await axios.get("https://www.sn.pl", { headers: HEADERS, timeout: 12_000, responseType: "arraybuffer" });
    const c = Buffer.from(html).toString("utf-8");
    const seen = new Set();
    const results = [];
    const linkRe = /href="(https?:\/\/(?:www\.)?sn\.pl\/aktualnosci\/SitePages\/[^"]+ItemSID=\d+[^"]+)"[^>]*>([^<]{10,200})</g;
    let m;
    while ((m = linkRe.exec(c)) !== null && results.length < 8) {
      const href  = m[1].replace(/^http:/, "https:");
      const title = stripHtml(m[2]).trim();
      if (!title || /czytaj/i.test(title) || seen.has(href)) continue;
      seen.add(href);
      const chunk = c.slice(m.index, m.index + 1500);
      const dateM = chunk.match(/(\d{1,2})\s+(\w+)\s+(\d{4})\s*r\./);
      const paraM = chunk.match(/<p[^>]*style[^>]*justify[^>]*>([\s\S]{20,400}?)<\/p>/);
      const lead  = paraM ? stripHtml(paraM[1]).replace(/​/g, "").trim().slice(0, 180) : null;
      results.push({ title, lead: lead || null, date: dateM ? `${dateM[1]} ${dateM[2]} ${dateM[3]}` : "", url: href, image: null });
    }
    if (results.length === 0) throw new Error("no items");
    return results;
  } catch { return []; }
}

/* ── Route handlers ──────────────────────────────────────────────────────── */
async function getTKNews(req, res)  { res.json(await scrapeTKNews());  }
async function getNSANews(req, res) { res.json(await scrapeNSANews()); }
async function getKRSNews(req, res) { res.json(await scrapeKRSNews()); }
async function getSNNews(req, res)  { res.json(await scrapeSNNews());  }

async function getJudicialNews(req, res) {
  const { slug } = req.params;
  if (slug === "constitutional_tribunal")           return getTKNews(req, res);
  if (slug === "supreme_administrative_court")      return getNSANews(req, res);
  if (slug === "national_council_of_the_judiciary") return getKRSNews(req, res);
  if (slug === "sn")                                return getSNNews(req, res);
  return res.json([]);
}

async function fetchJudicialNewsItems(slug) {
  if (slug === "constitutional_tribunal")           return scrapeTKNews();
  if (slug === "supreme_administrative_court")      return scrapeNSANews();
  if (slug === "national_council_of_the_judiciary") return scrapeKRSNews();
  if (slug === "sn")                                return scrapeSNNews();
  return [];
}

module.exports = { getJudicialNews, fetchJudicialNewsItems };

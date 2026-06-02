const axios = require("axios");

const SENAT_BASE = "https://www.senat.gov.pl";
const SENAT_API  = "https://api.sejm.gov.pl/senat";
const TERM       = "term11";
const HEADERS    = { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" };

/* Mapowanie pełnych nazw klubów → unified IDs używanych w hemicyklu */
function resolveClubId(fullName) {
  const n = (fullName ?? "").toLowerCase();
  if (n.includes("koalicja obywatelska") || n.includes("platforma obywatelska")) return "KO";
  if (n.includes("prawo i sprawiedliwo"))                                         return "PiS";
  if (n.includes("lewic"))                                                        return "Lewica";
  if (n.includes("trzecia droga"))                                                return "PSL-TD";
  if (n.includes("nowa polska") || n.includes("nowa polska-centrum"))             return "NPC";
  if (n.includes("niezrzeszeni") || n.includes("niezale"))                        return "niez.";
  return null;
}

/* Mapowanie nazwisk → klub (awaryjny, gdy profil niedostępny) */
const NAME_CLUB_MAP = {
  "Małgorzata Kidawa-Błońska": "KO",
  "Michał Kamiński":           "PSL-TD",
  "Magdalena Biejat":          "Lewica",
  "Rafał Grupiński":           "KO",
  "Maciej Żywno":              "Polska2050",
};

function normalizeClubId(raw) {
  return CLUB_ID_MAP[raw] ?? raw;
}

/* ── Wydobywa zdjęcie z podstrony senat.gov.pl ───────────────────────────── */
async function fetchPhotoFromPage(url) {
  try {
    const { data: html } = await axios.get(url, { headers: HEADERS, timeout: 8_000 });
    // Szukaj zdjęć z senatsenatorowie (profil senatora)
    const m1 = html.match(/src="(\/gfx\/senat\/_thumbs\/pl\/senatsenatorowie\/[^"]+\.jpg)"/);
    if (m1) return `${SENAT_BASE}${m1[1]}`;
    // Szukaj plików z userfiles (strony specjalne np. Marszałek, Kamiński)
    const m2 = html.match(/src="(\/gfx\/senat\/userfiles\/_public\/[^"]+\.jpg)"/);
    if (m2) return `${SENAT_BASE}${m2[1]}`;
  } catch { /* ignoruj */ }
  return null;
}

/* ── Scraper Prezydium ze strony senat.gov.pl ────────────────────────────── */
async function scrapePrezydium() {
  const { data: html } = await axios.get(
    `${SENAT_BASE}/o-senacie/organy/prezydium-senatu/`,
    { headers: HEADERS, timeout: 12_000 }
  );

  // Każdy blok: <div class="tresc"><p>Rola - <a href="URL">Imię Nazwisko</a></p></div>
  const blockRe = /<div class="tresc"><p[^>]*>\s*(.*?)\s*<\/p><\/div>/gi;
  // ^ kotwica — "Marszałek" nie może dopasować się wewnątrz "Wicemarszałek"
  // Wicemarsza[łl](?:ek|k) obsługuje formę męską "Wicemarszałek" i żeńską "Wicemarszałkini"
  const memberRe = /^(Wicemarsza[łl](?:ek|k)[^\-–]*|Marsza[łl]ek[^\-–]*)\s*[-–&nbsp;\s]*<a\s+href="([^"]+)">([^<]+)<\/a>/i;

  const members = [];
  let block;
  while ((block = blockRe.exec(html)) !== null) {
    const m = memberRe.exec(block[1]);
    if (!m) continue;

    const roleRaw = m[1].trim().replace(/&nbsp;/g, "").trim();
    const href    = m[2].trim();
    const name    = m[3].replace(/&nbsp;/g, " ").trim();

    const isMarszalek = !/wice/i.test(roleRaw);
    const fullHref    = href.startsWith("http") ? href : `${SENAT_BASE}${href}`;

    // ID z URL /sklad/senatorowie/senator,{id},11,{slug}.html
    const idMatch  = href.match(/senator,(\d+),\d+,([^/]+)\.html/);
    const senId    = idMatch ? idMatch[1] : null;
    const senSlug  = idMatch ? idMatch[2] : null;

    members.push({ name, isMarszalek, fullHref, senId, senSlug });
  }

  if (members.length === 0) throw new Error("no members parsed");
  return members;
}

/* ── Kierownictwo ────────────────────────────────────────────────────────── */
async function getSenatLeadership(req, res) {
  try {
    const members = await scrapePrezydium();

    const result = await Promise.all(members.map(async ({ name, isMarszalek, fullHref, senId, senSlug }) => {
      // Zdjęcie: jeśli standardowy senator → znany wzorzec URL
      let photoUrl = null;
      if (senId && senSlug) {
        photoUrl = `${SENAT_BASE}/gfx/senat/_thumbs/pl/senatsenatorowie/${senId}/11/zdjecie/mlbce1-bWmg,${senSlug}.jpg`;
      } else {
        // Strona specjalna (Marszałek, Kamiński) — wyciągnij z HTML strony
        photoUrl = await fetchPhotoFromPage(fullHref);
      }

      // Klub z mapy po nazwisku
      const club = NAME_CLUB_MAP[name] ?? "niez.";

      return {
        id:       senId,
        name,
        photoUrl,
        title:    isMarszalek ? "Marszałek Senatu RP" : "Wicemarszałek Senatu RP",
        role:     isMarszalek ? "marszalek" : "wicemarszalek",
        club,
      };
    }));

    res.json(result);
  } catch (err) {
    // Fallback statyczny
    res.json([
      { id: null, name: "Małgorzata Kidawa-Błońska", photoUrl: `${SENAT_BASE}/gfx/senat/userfiles/_public/k11/mkb.jpg`,                          title: "Marszałek Senatu RP",     role: "marszalek",     club: "KO" },
      { id: null, name: "Michał Kamiński",           photoUrl: `${SENAT_BASE}/gfx/senat/userfiles/_public/aaa/kaminski_1620x1080.jpg`,            title: "Wicemarszałek Senatu RP", role: "wicemarszalek", club: "PSL-TD" },
      { id: null, name: "Magdalena Biejat",          photoUrl: `${SENAT_BASE}/gfx/senat/_thumbs/pl/senatsenatorowie/1065/11/zdjecie/mlbce1-bWmg,biejat.jpg`,    title: "Wicemarszałek Senatu RP", role: "wicemarszalek", club: "Lewica" },
      { id: null, name: "Rafał Grupiński",           photoUrl: `${SENAT_BASE}/gfx/senat/_thumbs/pl/senatsenatorowie/1050/11/zdjecie/mlbce1-bWmg,grupinski.jpg`, title: "Wicemarszałek Senatu RP", role: "wicemarszalek", club: "KO" },
      { id: null, name: "Maciej Żywno",              photoUrl: `${SENAT_BASE}/gfx/senat/_thumbs/pl/senatsenatorowie/1072/11/zdjecie/mlbce1-bWmg,zywno.jpg`,     title: "Wicemarszałek Senatu RP", role: "wicemarszalek", club: "Polska2050" },
    ]);
  }
}

/* ── Kluby senatorskie — scraper senat.gov.pl ────────────────────────────── */
async function getSenatClubs(req, res) {
  try {
    const { data: html } = await axios.get(
      `${SENAT_BASE}/sklad/kluby-i-kola/`,
      { headers: HEADERS, timeout: 12_000 }
    );

    // Każdy blok klubu zawiera title="...: Pełna Nazwa Klubu" i "N senatorów"
    const blockRe = /<div class="klub-kontener[^"]*">(.*?)<\/div>\s*<\/div>\s*<\/div>/gis;
    const result = [];
    let m;
    while ((m = blockRe.exec(html)) !== null) {
      const block    = m[1];
      const titleM   = block.match(/title="[^"]*?:\s*([^"]+)"/);
      const countM   = block.match(/(\d+)\s*senator/);
      if (!titleM || !countM) continue;

      const fullName = titleM[1].trim();
      const count    = parseInt(countM[1], 10);
      if (count === 0) continue;

      const id = resolveClubId(fullName);
      if (!id) continue;

      result.push({ id, name: fullName, membersCount: count });
    }

    if (result.length === 0) throw new Error("no clubs parsed");
    res.json(result);
  } catch {
    // Fallback statyczny (stan na 2025-06)
    res.json([
      { id: "KO",     name: "Koalicja Obywatelska", membersCount: 42 },
      { id: "PiS",    name: "Prawo i Sprawiedliwość", membersCount: 33 },
      { id: "Lewica", name: "Lewica",                membersCount:  8 },
      { id: "PSL-TD", name: "Trzecia Droga",          membersCount:  8 },
      { id: "NPC",    name: "NOWA Polska-Centrum",    membersCount:  7 },
      { id: "niez.",  name: "Niezrzeszeni",           membersCount:  2 },
    ]);
  }
}

/* ── Pomocnik: polska nazwa miesiąca → numer (01–12) ─────────────────────── */
const MONTHS = {
  stycznia:1, lutego:2, marca:3, kwietnia:4, maja:5, czerwca:6,
  lipca:7, sierpnia:8, września:9, października:10, listopada:11, grudnia:12,
};

function parsePlDate(text) {
  // "10 i 11 czerwca 2026 r." → ["2026-06-10", "2026-06-11"]
  // "20 maja 2026 r."         → ["2026-05-20"]
  const year  = (text.match(/(\d{4})/) ?? [])[1];
  const month = Object.entries(MONTHS).find(([k]) => text.toLowerCase().includes(k));
  const days  = [...text.matchAll(/\b(\d{1,2})\b/g)].map(m => m[1]).filter(d => +d <= 31);
  if (!year || !month || !days.length) return [];
  const mm = String(month[1]).padStart(2, "0");
  return days.map(d => `${year}-${mm}-${String(d).padStart(2, "0")}`);
}

/* ── Posiedzenia — scraper senat.gov.pl ──────────────────────────────────── */
async function getSenatProceedings(req, res) {
  try {
    const { data: html } = await axios.get(
      `${SENAT_BASE}/prace/posiedzenia/`,
      { headers: HEADERS, timeout: 12_000 }
    );

    const today = new Date().toISOString().slice(0, 10);

    // Każdy blok posiedzenia: <div class="meeting  container-posiedzenia">…</div>
    const blockRe = /<div class="meeting[^"]*container-posiedzenia">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g;
    const results = [];
    let m;

    while ((m = blockRe.exec(html)) !== null) {
      const block = m[1];

      // Numer i link: "60. posiedzenie Senatu RP XI kadencji"
      const headM = block.match(/href="([^"]+)"[^>]*>\s*([\d]+)\.\s*posiedzenie/i);
      if (!headM) continue;

      const href   = headM[1].startsWith("http") ? headM[1] : `${SENAT_BASE}${headM[1]}`;
      const number = parseInt(headM[2], 10);

      // Data z bloku date-container
      const dateM = block.match(/class="date-container"[\s\S]*?<span[^>]*>\s*([^<]+?)\s*<\/span>/i);
      const dates = dateM ? parsePlDate(dateM[1]) : [];

      // Planowane?
      const upcoming = /planowane/i.test(block) || (dates[0] ?? "") >= today;

      results.push({
        number,
        title:    `${number}. Posiedzenie Senatu RP`,
        dates,
        date:     dates[0] ?? "",
        upcoming,
        href,
      });

      if (results.length >= 10) break;
    }

    if (results.length === 0) throw new Error("no proceedings parsed");
    res.json(results);
  } catch {
    res.json([]);
  }
}

/* ── Proxy zdjęcia senatora (z senat.gov.pl) ────────────────────────────── */
async function getSenatorPhoto(req, res) {
  const { id } = req.params;
  // id może być numerem senatora LUB zakodowanym URL zdjęcia
  const photoUrl = decodeURIComponent(id);
  try {
    const response = await axios.get(
      photoUrl.startsWith("http") ? photoUrl : `${SENAT_BASE}${photoUrl}`,
      { headers: HEADERS, responseType: "arraybuffer", timeout: 8_000 }
    );
    res.set("Content-Type", response.headers["content-type"] || "image/jpeg");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(response.data);
  } catch {
    res.status(404).end();
  }
}

module.exports = { getSenatLeadership, getSenatClubs, getSenatProceedings, getSenatorPhoto };

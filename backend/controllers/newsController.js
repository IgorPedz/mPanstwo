const axios   = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://www.gov.pl";

// ministry data-key → { govSlug, newsPath }
const NEWS_MAP = {
  ministry_of_finance:                             { s: "finanse",           p: "wiadomosci" },
  ministry_of_health:                              { s: "zdrowie",           p: "aktualnosci" },
  ministry_of_national_defence:                    { s: "obrona-narodowa",   p: "aktualnosci5" },
  ministry_of_justice:                             { s: "sprawiedliwosc",    p: "aktualnosci" },
  ministry_of_foreign_affairs:                     { s: "dyplomacja",        p: "aktualnosci" },
  ministry_of_infrastructure:                      { s: "infrastruktura",    p: "aktualnosci" },
  ministry_of_agriculture:                         { s: "rolnictwo",         p: "wiadomosci" },
  ministry_of_climate_and_environment:             { s: "klimat",            p: "wiadomosci" },
  ministry_of_state_assets:                        { s: "aktywa-panstwowe",  p: "wiadomosci" },
  ministry_of_culture_and_national_heritage:       { s: "kultura",           p: "aktualnosci" },
  ministry_of_sport_and_tourism:                   { s: "sport",             p: "wiadomosci" },
  ministry_of_family_labour_and_social_policy:     { s: "rodzina",           p: "aktualnosci-wiadomosci" },
  ministry_of_energy:                              { s: "energia",           p: "wiadomosci" },
  ministry_of_education:                           { s: "edukacja",          p: "wiadomosci" },
  ministry_of_funds_and_regional_policy:           { s: "fundusze-regiony",  p: "aktualnosci1" },
  ministry_of_science_and_higher_education:        { s: "nauka",             p: "wiadomosci" },
  ministry_of_internal_affairs_and_administration: { s: "mswia",             p: "aktualnosci" },
  ministry_of_digital_affairs:                     { s: "cyfryzacja",        p: "wiadomosci" },
  chancellery_of_the_prime_minister:               { s: "premier",           p: "wydarzenia" },
  council_of_ministers:                            { s: "premier",           p: "decyzje-rzadu" },
};

async function getMinistryNews(req, res) {
  const { slug } = req.params;
  const entry = NEWS_MAP[slug];

  if (!entry) {
    return res.status(404).json({ error: "Unknown institution slug" });
  }

  const url = `${BASE_URL}/web/${entry.s}/${entry.p}`;

  let html;
  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" },
      timeout: 10_000,
    });
    html = response.data;
  } catch (err) {
    return res.status(502).json({ error: "Failed to fetch news", detail: err.message });
  }

  const $     = cheerio.load(html);
  const items = [];

  $(".art-prev li").each((_, el) => {
    const title = $(el).find(".title a").text().trim();
    const href  = $(el).find(".title a").attr("href") || "";
    const date  = $(el).find(".date").text().trim();
    const lead  = $(el).find(".intro").text().trim();
    const imgSrc = $(el).find("picture img").attr("src") || "";

    if (!title) return;

    items.push({
      title,
      url:   href ? (href.startsWith("http") ? href : `${BASE_URL}${href}`) : null,
      date,
      lead,
      image: imgSrc ? (imgSrc.startsWith("http") ? imgSrc : `${BASE_URL}${imgSrc}`) : null,
    });
  });

  res.json({ slug, source: url, items });
}

const PREZYDENT_NEWS_MAP = {
  president:                "/aktualnosci/",
  presidential_chancellery: "/kancelaria/aktywnosc-ministrow/",
};

async function getPrezydentPlNews(req, res) {
  const slug = req.path.split("/").filter(Boolean).pop() ?? "president";
  const path = PREZYDENT_NEWS_MAP[slug];
  if (!path) return res.status(404).json({ error: "Unknown prezydent.pl slug" });

  const BASE = "https://www.prezydent.pl";
  const url  = `${BASE}${path}`;

  let html;
  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; mPanstwo/1.0)" },
      timeout: 10_000,
    });
    html = response.data;
  } catch (err) {
    return res.status(502).json({ error: "Failed to fetch news", detail: err.message });
  }

  const $     = cheerio.load(html);
  const items = [];

  $(".articles-item").each((_, el) => {
    const $el    = $(el);
    const $title = $el.find(".articles-item__title a");
    const title  = $title.text().trim();
    const href   = $title.attr("href") || "";
    const date   = $el.find(".articles-item__date").text().trim();
    const lead   = $el.find(".articles-item__description").text().trim();
    const imgSrc = $el.find("img").first().attr("src") || "";

    if (!title) return;

    items.push({
      title,
      url:   href ? (href.startsWith("http") ? href : `${BASE}${href}`) : null,
      date,
      lead,
      image: imgSrc ? (imgSrc.startsWith("http") ? imgSrc : `${BASE}${imgSrc}`) : null,
    });
  });

  res.json({ slug, source: url, items });
}

module.exports = { getMinistryNews, getPrezydentPlNews };

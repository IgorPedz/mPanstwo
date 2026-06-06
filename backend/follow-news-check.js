const db = require("./db");
const sendNotification = require("./utils/notification");
const { fetchMinistryNewsItems, fetchPresidentNewsItems } = require("./controllers/newsController");
const { fetchJudicialNewsItems } = require("./controllers/judicialController");

async function fetchNewsForInstitution(institutionId, institutionType) {
  if (institutionType === "judicial") return fetchJudicialNewsItems(institutionId);
  if (institutionType === "president") return fetchPresidentNewsItems(institutionId);
  return fetchMinistryNewsItems(institutionId);
}

// Klucz porównania — URL jeśli dostępny, inaczej tytuł
function itemKey(item) {
  return item.url || item.title || "";
}

async function runFollowNewsCheck({ force = false } = {}) {
  let institutions;
  try {
    const [rows] = await db.query(
      `SELECT DISTINCT institution_id, institution_type, institution_title FROM institution_follows`
    );
    institutions = rows;
  } catch (err) {
    console.error("[follow-check] DB query error:", err.message);
    return;
  }

  if (!institutions.length) return;

  for (const inst of institutions) {
    try {
      const items = await fetchNewsForInstitution(inst.institution_id, inst.institution_type);
      if (!items || items.length === 0) continue;

      const latestKey   = itemKey(items[0]);
      const latestTitle = items[0].title;
      const latestUrl   = items[0].url ?? null;

      const [cacheRows] = await db.query(
        `SELECT last_news_title, last_news_url FROM institution_news_cache WHERE institution_id = ?`,
        [inst.institution_id]
      );

      if (cacheRows.length === 0) {
        await db.query(
          `INSERT INTO institution_news_cache (institution_id, institution_type, last_news_title, last_news_url)
           VALUES (?, ?, ?, ?)`,
          [inst.institution_id, inst.institution_type, latestTitle, latestUrl]
        );
        console.log(`[follow-check] SEED  ${inst.institution_id}: "${latestTitle}"`);
        continue;
      }

      const cachedKey = cacheRows[0].last_news_url || cacheRows[0].last_news_title || "";

      console.log(`[follow-check] ${inst.institution_id}`);
      console.log(`  cache:  "${cachedKey}"`);
      console.log(`  latest: "${latestKey}"`);

      if (cachedKey === latestKey && !force) {
        console.log(`  → brak zmian`);
        continue;
      }

      // Policz ile nowych artykułów pojawiło się przed poprzednim
      let newCount = 0;
      for (const item of items) {
        if (itemKey(item) === cachedKey) break;
        newCount++;
      }
      if (newCount === 0) newCount = 1; // fallback jeśli nie znaleziono starego w liście

      // Zaktualizuj cache
      await db.query(
        `UPDATE institution_news_cache
         SET last_news_title = ?, last_news_url = ?, checked_at = UTC_TIMESTAMP()
         WHERE institution_id = ?`,
        [latestTitle, latestUrl, inst.institution_id]
      );

      // Powiadom obserwujących — pomijaj tych którzy już dostali ten URL
      const [followers] = await db.query(
        `SELECT user_id, last_notified_url FROM institution_follows WHERE institution_id = ?`,
        [inst.institution_id]
      );

      let notified = 0;
      for (const { user_id, last_notified_url } of followers) {
        if (last_notified_url === latestUrl) {
          console.log(`  → user ${user_id} już dostał to powiadomienie, pomijam`);
          continue;
        }

        await sendNotification({
          type: "LAW_UPDATE",
          userId: user_id,
          data: {
            institutionId:   inst.institution_id,
            institutionName: inst.institution_title,
            newsTitle:       latestTitle,
            newsUrl:         latestUrl,
            newCount,
          },
        });

        await db.query(
          `UPDATE institution_follows SET last_notified_url = ?
           WHERE user_id = ? AND institution_id = ?`,
          [latestUrl, user_id, inst.institution_id]
        );
        notified++;
      }

      console.log(
        `[follow-check] ${inst.institution_title}: ${newCount} nowych artykułów, ` +
        `najnowszy: "${latestTitle}" → powiadomiono ${followers.length} user(ów)`
      );
    } catch (err) {
      console.error(`[follow-check] Error checking ${inst.institution_id}:`, err.message);
    }
  }
}

module.exports = { runFollowNewsCheck };

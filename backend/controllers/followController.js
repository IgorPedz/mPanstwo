const db = require("../db");

async function ensureFollowTables() {
  await db.query(`
    ALTER TABLE institution_follows
    ADD COLUMN IF NOT EXISTS last_notified_url VARCHAR(1000) DEFAULT NULL
  `).catch(() => {});
  await db.query(`
    ALTER TABLE institution_follows
    ADD COLUMN IF NOT EXISTS institution_title_key VARCHAR(200) DEFAULT NULL
  `).catch(() => {});

  await db.query(`
    CREATE TABLE IF NOT EXISTS institution_follows (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      user_id       INT          NOT NULL,
      institution_id VARCHAR(100) NOT NULL,
      institution_title VARCHAR(255) NOT NULL,
      institution_title_key VARCHAR(200) DEFAULT NULL,
      institution_type  VARCHAR(50)  NOT NULL DEFAULT 'ministry',
      icon              VARCHAR(100) DEFAULT NULL,
      accent            VARCHAR(50)  DEFAULT NULL,
      path              VARCHAR(200) DEFAULT NULL,
      last_notified_url VARCHAR(1000) DEFAULT NULL,
      created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_user_inst (user_id, institution_id)
    )
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS institution_news_cache (
      institution_id   VARCHAR(100) NOT NULL PRIMARY KEY,
      institution_type VARCHAR(50)  NOT NULL DEFAULT 'ministry',
      last_news_title  VARCHAR(500) DEFAULT NULL,
      last_news_url    VARCHAR(1000) DEFAULT NULL,
      checked_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

async function followInstitution(req, res) {
  const { userId, institutionId, title, titleKey, type, icon, accent, path } = req.body;
  if (!userId || !institutionId || !title) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    await db.query(
      `INSERT IGNORE INTO institution_follows
         (user_id, institution_id, institution_title, institution_title_key, institution_type, icon, accent, path)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, institutionId, title, titleKey || null, type || "ministry", icon || null, accent || null, path || null]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ error: "DB error" });
  }
}

async function unfollowInstitution(req, res) {
  const { institutionId } = req.params;
  const { userId } = req.query;
  if (!userId || !institutionId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    await db.query(
      `DELETE FROM institution_follows WHERE user_id = ? AND institution_id = ?`,
      [userId, institutionId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ error: "DB error" });
  }
}

async function getFollows(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  try {
    const [rows] = await db.query(
      `SELECT institution_id AS id, institution_title AS title,
              institution_title_key AS titleKey,
              institution_type AS type, icon, accent, path
       FROM institution_follows WHERE user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get follows error:", err);
    res.status(500).json({ error: "DB error" });
  }
}

async function markSeen(req, res) {
  const { institutionId } = req.params;
  const { userId, latestUrl } = req.body;
  if (!userId || !institutionId || !latestUrl) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    await db.query(
      `UPDATE institution_follows SET last_notified_url = ?
       WHERE user_id = ? AND institution_id = ?`,
      [latestUrl, userId, institutionId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Mark seen error:", err);
    res.status(500).json({ error: "DB error" });
  }
}

module.exports = { ensureFollowTables, followInstitution, unfollowInstitution, getFollows, markSeen };

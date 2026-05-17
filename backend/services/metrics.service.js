const db = require("../db");

async function incrementMetric(userId, metricKey, amount = 1) {
  console.log("📊 METRIC START:", { userId, metricKey, amount });

  if (!userId || !metricKey) {
    console.log("❌ missing params");
    return;
  }

  try {
    // 1. sprawdź czy user ma rekord
    const [rows] = await db.query(
      `SELECT * FROM user_metrics WHERE user_id = ?`,
      [userId]
    );

    // 2. jeśli NIE MA → CREATE
    if (!rows.length) {
      console.log("🆕 CREATING metrics row");

      await db.query(
        `INSERT INTO user_metrics (user_id, ${metricKey})
         VALUES (?, ?)`,
        [userId, amount]
      );

      return;
    }

    // 3. UPDATE
    console.log("🔄 UPDATING metric:", metricKey);

    await db.query(
      `UPDATE user_metrics
       SET ${metricKey} = COALESCE(${metricKey}, 0) + ?
       WHERE user_id = ?`,
      [amount, userId]
    );

    console.log("✅ METRIC UPDATED");
  } catch (err) {
    console.error("❌ METRIC ERROR:", err);
  }
}

module.exports = { incrementMetric };
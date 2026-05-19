const db = require("../db");

async function incrementMetric(userId, metricKey, amount = 1) {

  if (!userId || !metricKey) {
    return;
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM user_metrics WHERE user_id = ?`,
      [userId]
    );

    if (!rows.length) {

      await db.query(
        `INSERT INTO user_metrics (user_id, ${metricKey})
         VALUES (?, ?)`,
        [userId, amount]
      );

      return;
    }

    await db.query(
      `UPDATE user_metrics
       SET ${metricKey} = COALESCE(${metricKey}, 0) + ?
       WHERE user_id = ?`,
      [amount, userId]
    );

  } catch (err) {
    console.error("❌ METRIC ERROR:", err);
  }
}

module.exports = { incrementMetric };
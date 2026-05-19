const db = require("../db");

const getNotifications = async (req, res) => {
  try {
    const userId = req.query.userId;

    const [rows] = await db.query(
      `
      SELECT *
      FROM notifications
      WHERE user_id IS NULL OR user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch notifications",
    });
  }
};

module.exports = {
  getNotifications,
};
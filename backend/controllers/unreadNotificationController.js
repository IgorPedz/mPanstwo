const db = require("../db");
const getNotifications = async (req, res) => {
  try {
    const userId = req.query.userId;

    const [rows] = await db.query(
      `SELECT *
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId],
    );
    res.json(rows);
  } catch (err) {
    console.error("GET NOTIFS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
const getUnreadNotifications = async (req, res) => {
  try {
    const userId = req.query.userId;

    const [rows] = await db.query(
      `SELECT *
       FROM notifications
       WHERE user_id = ? AND is_read = 0
       ORDER BY created_at DESC`,
      [userId],
    );
    res.json(rows);
  } catch (err) {
    console.error("GET NOTIFS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [result] = await db.query(
      `UPDATE notifications 
       SET is_read = 1 
       WHERE id = ?`,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({ success: true, id });
  } catch (err) {
    console.error("MARK READ ERROR:", err);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

const clearReadNotifications = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    await db.query(
      `DELETE FROM notifications 
       WHERE is_read = 1 AND user_id = ?`,
      [userId],
    );

    res.json({ success: true });
  } catch (err) {
    console.error("CLEAR READ ERROR:", err);
    res.status(500).json({ error: "Failed to clear history" });
  }
};

module.exports = {
  getUnreadNotifications,
  markAsRead,
  clearReadNotifications,
};

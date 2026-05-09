const db = require("../db");
const { getIO } = require("../socket/socket");
const EVENT_CONFIG = require("../config/eventConfig");

async function sendNotification({ type, message, userId = null, data = null }) {
  console.log("🚀 sendNotification CALLED", { type, userId, message });

  const io = getIO();

  console.log("🔥 IO EXISTS:", !!io);
  console.log("🔥 EMITTING NOTIFICATION");

  const config = EVENT_CONFIG[type] || EVENT_CONFIG.SYSTEM_ALERT;

  try {
    // 🔥 1. Zapis do bazy
    const [result] = await db.query(
      `
      INSERT INTO notifications
      (user_id, type, title, message, data)
      VALUES (?, ?, ?, ?, ?)
      `,
      [userId || null, type, config.title, message, JSON.stringify(data)],
    );

    const notification = {
      id: result.insertId,
      user_id: userId,
      type,
      title: config.title,
      message,
      icon: config.icon,
      color: config.color,
      data,
      is_read: 0,
      created_at: new Date().toISOString(), 
    };
    console.log(userId)
    if (!userId) {
      io.emit("notification", notification);
      return;
    }

    io.to(`user:${userId}`).emit("notification", notification);
  } catch (err) {
    console.error("DB notification error:", err);
  }
}

module.exports = sendNotification;

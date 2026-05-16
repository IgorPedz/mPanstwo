const db = require("../db");
const { getIO } = require("../socket/socket");
const EVENT_CONFIG = require("../config/eventConfig");

async function sendNotification({
  type,
  title,
  message,
  userId = null,
  data = null,
  icon,
  color,
}) {
  console.log("🚀 sendNotification");

  try {
    const io = getIO();

    const eventKey =
      typeof type === "string" ? type.trim().toUpperCase() : type;

    const config = EVENT_CONFIG[eventKey];

    const finalTitle =
      title ?? config?.title ?? "Powiadomienie systemowe";

    const finalIcon =
      icon ?? config?.icon ?? "default";

    const finalColor =
      color ?? config?.color ?? "gray";

    const [result] = await db.query(
      `
      INSERT INTO notifications
      (user_id, type, title, message, data)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        userId || null,
        eventKey,
        finalTitle,
        message,
        data ? JSON.stringify(data) : null,
      ],
    );

    const notification = {
      id: result.insertId,
      user_id: userId,
      type: eventKey,
      title: finalTitle,
      message,
      icon: finalIcon,
      color: finalColor,
      data,
      is_read: 0,
      created_at: new Date().toISOString(),
    };

    if (!io) return notification;

    if (!userId) {
      io.emit("notification", notification);
      return notification;
    }

    io.to(`user:${userId}`).emit("notification", notification);

    return notification;
  } catch (err) {
    console.error("DB NOTIFICATION ERROR:", err);
    return null;
  }
}

module.exports = sendNotification;
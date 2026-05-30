const db = require("../db");
const { getIO } = require("../socket/socket");
const EVENT_CONFIG = require("../config/eventConfig");

async function sendNotification({
  type,
  userId = null,
  data = null,
  icon,
  color,
}) {
  try {
    const io = getIO();

    const eventKey =
      typeof type === "string" ? type.trim().toUpperCase() : type;

    const config = EVENT_CONFIG[eventKey] ||
      EVENT_CONFIG.SYSTEM_ALERT || {
        icon: "🔔",
        color: "gray",
      };

    const finalIcon = icon ?? config.icon ?? "🔔";

    const finalColor = color ?? config.color ?? "gray";
      console.log(finalIcon, finalColor);
    const [result] = await db.query(
      `
  INSERT INTO notifications
  (user_id, icon, color, type, data, created_at)
  VALUES (?, ?, ?, ?, ?, UTC_TIMESTAMP())
  `,
      [
        userId || null,
        finalIcon,
        finalColor,
        eventKey,
        data ? JSON.stringify(data) : null,
      ],
    );

    const notification = {
      id: result.insertId,
      user_id: userId,
      type: eventKey,
      icon: finalIcon,
      color: finalColor,
      data,
      is_read: 0,
      created_at: new Date().toISOString(),
    };

    if (!io) {
      return notification;
    }

    if (!userId) {
      io.emit("notification", notification);
      return notification;
    }

    io.to(`user:${userId}`).emit("notification", notification);

    return notification;
  } catch (err) {
    console.error("❌ DB NOTIFICATION ERROR:", err);
    return null;
  }
}

module.exports = sendNotification;

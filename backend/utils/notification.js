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
  try {
    const io = getIO();

    const eventKey =
      typeof type === "string" ? type.trim().toUpperCase() : type;

    const config = EVENT_CONFIG[eventKey] ||
      EVENT_CONFIG.SYSTEM_ALERT || {
        title: "Powiadomienie",
        icon: "🔔",
        color: "gray",
      };

    const finalTitle = title ?? config.title ?? "Powiadomienie systemowe";

    const finalIcon = icon ?? config.icon ?? "🔔";

    const finalColor = color ?? config.color ?? "gray";

    const [result] = await db.query(
      `
  INSERT INTO notifications
  (user_id, icon, type, title, message, data)
  VALUES (?, ?, ?, ?, ?, ?)
  `,
      [
        userId || null,
        finalIcon, // 🔥 FIX
        eventKey,
        finalTitle,
        message ?? "",
        data ? JSON.stringify(data) : null,
      ],
    );

    const notification = {
      id: result.insertId,
      user_id: userId,
      type: eventKey,
      title: finalTitle,
      message: message ?? "",
      icon: finalIcon,
      color: finalColor,
      data,
      is_read: 0,
      created_at: new Date().toISOString(),
    };

    if (!io) {
      console.log("❌ NO SOCKET IO");
      return notification;
    }

    if (!userId) {
      io.emit("notification", notification);
      return notification;
    }

    io.to(`user:${userId}`).emit("notification", notification);

    console.log("✅ SENT TO:", userId);

    return notification;
  } catch (err) {
    console.error("❌ DB NOTIFICATION ERROR:", err);
    return null;
  }
}

module.exports = sendNotification;

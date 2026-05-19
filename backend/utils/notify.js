const { getIO } = require("../socket/socket");
const EVENT_CONFIG = require("../config/eventConfig");

function sendNotification({ type, message, data = null, userId = null }) {
  const io = getIO();

  const config = EVENT_CONFIG[type] || EVENT_CONFIG.SYSTEM_ALERT;

  const payload = {
    type,
    message,
    icon: config.icon,
    color: config.color,
    data,
    timestamp: new Date(),
  };

  if (!userId) {
    console.warn("⚠️ Notification without userId ignored");
    return;
  }

  const room = `user:${userId}`;


  io.to(room).emit("notification", payload);
}

module.exports = sendNotification;
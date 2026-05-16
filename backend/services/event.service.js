const { addXP } = require("./xp.service");
const sendNotification = require("../utils/notification");
const EVENT_CONFIG = require("../config/eventConfig");

async function handleEvent(userId, eventType, meta = {}) {
  console.log("EVENT RAW:", eventType);

  if (!userId) {
    console.log("NO USER ID");
    return;
  }

  // 🔥 NORMALIZACJA EVENTU
  const key =
    typeof eventType === "string" ? eventType.trim().toUpperCase() : eventType;

  const config = EVENT_CONFIG[key];

  if (!config) {
    console.log("UNKNOWN EVENT:", key);
    return;
  }

  const xp = config.xp ?? 0;

  let totalXP = null;

  // 🔥 XP ONLY ONCE
  if (xp > 0) {
    totalXP = await addXP(userId, xp, key);
  }

  await sendNotification({
    type: key,
    userId,
    title: config.title,
    message: `+${xp} XP za ${config.title}`,
    icon: config.icon,
    color: config.color,
    data: {
      eventType: key,
      xp,
      totalXP,
    },
  });

  return totalXP;
}

module.exports = { handleEvent };

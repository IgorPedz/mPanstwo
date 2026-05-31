const { addXP } = require("./xp.service");
const sendNotification = require("../utils/notification");
const EVENT_CONFIG = require("../config/eventConfig");
const { incrementMetric } = require("./metrics.service");
const { checkAchievements } = require("./achievement.service");

async function handleEvent(userId, eventType, meta = {}) {
  const key = eventType.trim().toUpperCase();

  const config = EVENT_CONFIG[key];
  if (!config) return;

  let totalXP = null;

  if (config.xp > 0) {
    totalXP = await addXP(userId, config.xp, key);
  }

  if (config.metricKey) {
    await incrementMetric(userId, config.metricKey, 1);
  }

  await checkAchievements(userId);

  if (
    config.metricKey != "modules_completed" ||
    config.metricKey != "lessons_completed" ||
    config.metricKey != "courses_completed"
  ) {
    await sendNotification({
      type: key,
      userId,
      icon: config.icon,
      color: config.color,
      data: {
        xp: config.xp ?? 0,
        totalXP,
      },
    });
  }

  return totalXP;
}

module.exports = { handleEvent };

const db = require("../db");
const { addXP } = require("./xp.service");
const sendNotification = require("../utils/notification");

async function checkAchievements(userId) {
  const [[metrics]] = await db.query(
    `SELECT * FROM user_metrics WHERE user_id = ?`,
    [userId]
  );

  if (!metrics) return;

  const [achievements] = await db.query(
    `SELECT * FROM achievements WHERE active = 1`
  );

  const [unlockedAchievements] = await db.query(
    `SELECT achievement_id FROM user_achievements WHERE user_id = ? AND unlocked = 1`,
    [userId]
  );
  
  const alreadyUnlockedIds = new Set(unlockedAchievements.map(a => a.achievement_id));
  for (const ach of achievements) {
    console.log(ach)
    if (alreadyUnlockedIds.has(ach.id)) {
      continue;
    }

    const key = ach.metric_key;
    if (!key) continue;

    const userValue = metrics[key] ?? 0;
    const progress = Math.min(userValue, ach.requirement_value);
    const shouldUnlock = userValue >= ach.requirement_value;

    await db.query(
      `
      INSERT INTO user_achievements 
        (user_id, achievement_id, progress, unlocked, unlocked_at)
      VALUES (?, ?, ?, ?, IF(?, NOW(), NULL))
      ON DUPLICATE KEY UPDATE
        progress = VALUES(progress),
        unlocked = VALUES(unlocked),
        unlocked_at = IF(unlocked_at IS NULL AND VALUES(unlocked) = 1, NOW(), unlocked_at)
      `,
      [userId, ach.id, progress, shouldUnlock ? 1 : 0, shouldUnlock]
    );

    if (shouldUnlock) {

      if (ach.xp_reward > 0) {
        await addXP(userId, ach.xp_reward, "ACHIEVEMENT");
      }

      await sendNotification({
        type: "ACHIEVEMENT_UNLOCK",
        userId,
        title: "Osiągnięcie odblokowane",
        message: `Zdobyto osiągniecię: ${ach.title}`,
        data: {
          achievementId: ach.id,
          xp: ach.xp_reward,
        },
      });
    }
  }
}

module.exports = { checkAchievements };
const db = require("../db");
const { addXP } = require("./xp.service");
const sendNotification = require("../utils/notification");

async function checkAchievements(userId) {
  try {
    const [[user]] = await db.query(
      `SELECT * FROM users WHERE id = ?`,
      [userId],
    );

    if (!user) {
      return;
    }

    const [[metrics]] = await db.query(
      `SELECT * FROM user_metrics WHERE user_id = ?`,
      [userId],
    );

    const [achievements] = await db.query(
      `SELECT * FROM achievements WHERE active = 1`,
    );

    const [unlocked] = await db.query(
      `SELECT achievement_id FROM user_achievements WHERE user_id = ? AND unlocked = 1`,
      [userId],
    );

    const unlockedIds = new Set(unlocked.map(a => a.achievement_id));

    for (const ach of achievements) {

      if (unlockedIds.has(ach.id)) {
        continue;
      }

      if (!ach.metric_key) {
        continue;
      }

      const source = (ach.metric_source || "user_metrics").toLowerCase();

      let userValue = 0;

      if (source === "users") {
        userValue = user?.[ach.metric_key] ?? 0;
      } else {
        userValue = metrics?.[ach.metric_key] ?? 0;
      }

      const progress = Math.min(
        userValue,
        ach.requirement_value,
      );

      const shouldUnlock =
        userValue >= ach.requirement_value;

      await db.query(
        `
        INSERT INTO user_achievements
        (user_id, achievement_id, progress, unlocked, unlocked_at)
        VALUES (?, ?, ?, ?, IF(? = 1, NOW(), NULL))
        ON DUPLICATE KEY UPDATE
          progress = VALUES(progress),
          unlocked = VALUES(unlocked),
          unlocked_at = IF(
            unlocked_at IS NULL AND VALUES(unlocked) = 1,
            NOW(),
            unlocked_at
          )
        `,
        [
          userId,
          ach.id,
          progress,
          shouldUnlock ? 1 : 0,
          shouldUnlock ? 1 : 0,
        ],
      );

      if (shouldUnlock) {

        if (ach.xp_reward > 0) {

          await addXP(userId, ach.xp_reward, "ACHIEVEMENT");
        }

        await sendNotification({
          type: "ACHIEVEMENT_UNLOCK",
          userId,
          icon: ach.icon || "trophy",
          color: 'amber',
          data: {
            achievementId: ach.id,
            achievementSlug: ach.slug,
            xp: ach.xp_reward,
          },
        });

      }
    }

  } catch (err) {
    console.error("❌ ACHIEVEMENT ERROR:", err);
  }
}

module.exports = { checkAchievements };
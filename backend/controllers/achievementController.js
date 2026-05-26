const db = require("../db");

exports.getUserAchievements = async (req, res) => {

  try {

    const userId = req.params.id;

    const [rows] = await db.query(`
      SELECT
        a.id,
        a.slug,

        a.xp_reward,
        a.requirement_value,

        a.rarity,

        ac.slug AS category_slug,

        ua.progress,
        ua.unlocked

      FROM achievements a

      LEFT JOIN user_achievements ua
        ON ua.achievement_id = a.id
        AND ua.user_id = ?

      JOIN achievement_categories ac
        ON ac.id = a.category_id

      ORDER BY a.id DESC
    `, [userId]);

    const formatted = rows.map(item => ({
      id: item.id,
      slug: item.slug,

      xpReward: item.xp_reward,

      requirementValue: item.requirement_value,

      icon: item.icon,
      rarity: item.rarity,

      progress: item.progress || 0,

      unlocked: !!item.unlocked,

      category: {
        slug: item.category_slug
      }
    }));

    res.json(formatted);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch achievements"
    });
  }
};
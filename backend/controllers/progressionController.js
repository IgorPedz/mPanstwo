const db = require("../db");

exports.getProgression = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const [[user]] = await db.query(
      `
      SELECT xp
      FROM users
      WHERE id = ?
    `,
      [userId],
    );

    const xp = user.xp;

    const [[currentRank]] = await db.query(
      `
      SELECT *
      FROM ranks
      WHERE required_xp <= ?
      ORDER BY required_xp DESC
      LIMIT 1
    `,
      [xp],
    );

    const [[nextRank]] = await db.query(
      `
      SELECT *
      FROM ranks
      WHERE required_xp > ?
      ORDER BY required_xp ASC
      LIMIT 1
    `,
      [xp],
    );

    let progressPercent = 100;

    if (nextRank) {
      progressPercent =
        ((xp - currentRank.required_xp) /
          (nextRank.required_xp - currentRank.required_xp)) *
        100;
    }

    res.json({
      xp,

      progressPercent,

      currentRank: {
        level: currentRank.level,
        name: currentRank.name,
        color:currentRank.color,
        requiredXP: currentRank.required_xp,
        icon: currentRank.icon,
      },

      nextRank: nextRank
        ? {
            level: nextRank.level,
            name: nextRank.name,
            requiredXP: nextRank.required_xp,
          }
        : null,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch progression",
    });
  }
};

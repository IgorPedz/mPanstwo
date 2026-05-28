const db = require("../db");

exports.getRanks = async (_req, res) => {
  console.log("🚀 [RANKS] REQUEST START");

  try {
    console.log("📡 [RANKS] QUERYING DB...");

    const [rows] = await db.query(`
      SELECT id, level, name, required_xp, color
      FROM ranks
      ORDER BY level ASC
    `);

    console.log("📦 [RANKS] RAW DB ROWS:");
    console.log(rows);

    if (!rows || rows.length === 0) {
      console.warn("⚠️ [RANKS] EMPTY RESULT FROM DB");
    }

    console.log(`📊 [RANKS] ROW COUNT: ${rows.length}`);

    const mapped = rows.map((rank, index) => {
      console.log(`➡️ [RANKS] MAPPING ROW #${index}`, rank);

      const level = Number(rank.level);

      const slug =
        rank.slug ||
        (typeof rank.name === "string" &&
        rank.name.toLowerCase().startsWith("rank")
          ? rank.name
          : `rank${level}`);

      const icon = rank.icon || `rank${level}`;

      const mappedRank = {
        id: rank.id,
        level,

        slug,

        nameKey: `achievements.ranks.${slug}.name`,
        xpKey: `achievements.ranks.${slug}.xp`,
        descriptionKey: `achievements.ranks.${slug}.desc`,

        icon,
        color: rank.color ?? "bg-slate-500",

        required_xp: rank.required_xp,
      };

      console.log("✅ [RANKS] MAPPED ROW:", mappedRank);

      return mappedRank;
    });

    console.log("📊 [RANKS] FINAL RESPONSE:");
    console.log(mapped);

    res.json(mapped);

    console.log("📤 [RANKS] RESPONSE SENT");
  } catch (err) {
    console.error("❌ [RANKS] ERROR OCCURED:");
    console.error(err);

    res.status(500).json({ error: "Failed to fetch ranks" });

    console.log("💥 [RANKS] ERROR RESPONSE SENT");
  }
};
const db = require("../db");

exports.getCategories = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT
        id,
        slug
      FROM achievement_categories
    `);

    res.json([
      {
        slug: "all"
      },
      ...rows
    ]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch categories"
    });
  }
};
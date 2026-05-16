const db = require("../db");

exports.getCategories = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT
        id,
        slug,
        name
      FROM achievement_categories
    `);

    res.json([
      {
        slug: "all",
        name: "Wszystkie"
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
const db = require("../db");

const getDashboardContent = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM dashboard_content");

    if (rows.length === 0) {
      return res.status(400).json({ message: "Brak contentu do dashboardu!" });
    }

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardContent,
};

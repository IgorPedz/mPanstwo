const db = require("../db");

const saveUserTiles = async (req, res, next) => {
  try {
    const { userId, tiles } = req.body;

    if (!userId || !Array.isArray(tiles)) {
      return res.status(400).json({ message: "Nieprawidłowe dane" });
    }

    const tilesJson = JSON.stringify(tiles);
    await db.query(
      `INSERT INTO user_tiles (user_id, tiles)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE tiles = VALUES(tiles)`,
      [userId, tilesJson]
    );

    res.json({ message: "Układ zapisany" });
  } catch (error) {
    next(error);
  }
};

const getUserTiles = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(400).json({ message: "Nieprawidłowy użytkownik" });
    }

    const [rows] = await db.query("SELECT tiles FROM user_tiles WHERE user_id = ?", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Brak zapisanego układu" });
    }

    res.json({ tiles: JSON.parse(rows[0].tiles) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveUserTiles,
  getUserTiles,
};

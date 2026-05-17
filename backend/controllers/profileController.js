const db = require("../db");
const bcrypt = require("bcrypt");
const cardRegistry = require("../config/cardConfig");
const isStrongPassword = require("../utils/strongpassword");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "Nieprawidłowy użytkownik" });
    }

    const [userRows] = await db.query(
      `SELECT id, name, email, login_streak, active_days, created_at, xp
       FROM users
       WHERE id = ?`,
      [userId],
    );

    if (!userRows.length) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const user = userRows[0];

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

    const [rows] = await db.query(
      `SELECT \`key\`, value_number, value_text
       FROM user_stats
       WHERE user_id = ?`,
      [userId],
    );

    const statsFromDb = rows.map((s) => {
      const registry = cardRegistry[s.key] || {};

      return {
        key: s.key,
        value: s.value_number ?? s.value_text ?? "-",
        title: registry.title || s.key,
        icon: registry.icon || "star",
        color: registry.color || "slate",
      };
    });

    const systemStats = [
      {
        key: "loginStreak",
        value: user.login_streak,
        title: cardRegistry.loginStreak.title,
        icon: cardRegistry.loginStreak.icon,
        color: cardRegistry.loginStreak.color,
      },
      {
        key: "activeDays",
        value: user.active_days,
        title: cardRegistry.activeDays.title,
        icon: cardRegistry.activeDays.icon,
        color: cardRegistry.activeDays.color,
      },
      {
        key: "reputation",
        value: user.xp,
        title: cardRegistry.reputation.title,
        icon: cardRegistry.reputation.icon,
        color: cardRegistry.reputation.color,
      },
      {
        key: "rank",
        value: currentRank.name,
        title: cardRegistry.rank.title,
        icon: cardRegistry.rank.icon,
        color: cardRegistry.rank.color,
      },
    ];

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,

      stats: [...systemStats, ...statsFromDb],
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { name } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Nieprawidłowy użytkownik" });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Nazwa jest wymagana" });
    }

    await db.query("UPDATE users SET name = ? WHERE id = ?", [name, userId]);

    const [rows] = await db.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [userId],
    );

    res.json({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      createdAt: rows[0].created_at,
      message: "Profil został zaktualizowany",
    });
  } catch (error) {
    next(error);
  }
};

const changeEmail = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { email, password } = req.body;

    if (!userId || !email || !password) {
      return res.status(400).json({ message: "Email i hasło są wymagane" });
    }

    const [userRows] = await db.query(
      "SELECT password FROM users WHERE id = ?",
      [userId],
    );
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const validPassword = await bcrypt.compare(password, userRows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Błędne hasło" });
    }

    const [emailCheck] = await db.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, userId],
    );
    if (emailCheck.length > 0) {
      return res.status(400).json({ message: "Email już istnieje w systemie" });
    }

    await db.query("UPDATE users SET email = ? WHERE id = ?", [email, userId]);

    res.json({
      message: "Email został zmieniony",
      email,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const { oldPassword, newPassword, confirmPassword } = req.body || {};

    console.log("DEBUG:", {
      userId,
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Brak ID użytkownika",
      });
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Stare i nowe hasło są wymagane",
      });
    }

    const cleanNew = String(newPassword).trim();
    const cleanConfirm = String(confirmPassword).trim();

    if (cleanNew !== cleanConfirm) {
      return res.status(400).json({
        success: false,
        message: "NOWE HASŁA NIE SĄ IDENTYCZNE",
      });
    }

    if (cleanNew.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Nowe hasło musi mieć co najmniej 6 znaków",
      });
    }

    const [userRows] = await db.query(
      "SELECT password FROM users WHERE id = ?",
      [userId],
    );

    if (!userRows.length) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie znaleziony",
      });
    }

    const validPassword = await bcrypt.compare(
      oldPassword,
      userRows[0].password,
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Stare hasło jest błędne",
      });
    }

    const hashedPassword = await bcrypt.hash(cleanNew, 10);

    const strongPassword = isStrongPassword(cleanNew);

    await db.query(
      `
    UPDATE users
    SET
      password = ?,
      is_strong = ?
    WHERE id = ?
  `,
      [hashedPassword, strongPassword ? 1 : 0, userId],
    );

    return res.json({
      success: true,
      message: "Hasło zostało zmienione",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: "Hasło jest wymagane" });
    }

    const [userRows] = await db.query(
      "SELECT password FROM users WHERE id = ?",
      [userId],
    );
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const validPassword = await bcrypt.compare(password, userRows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Błędne hasło" });
    }

    await db.query("DELETE FROM user_tiles WHERE user_id = ?", [userId]);

    await db.query("DELETE FROM users WHERE id = ?", [userId]);

    res.json({
      message: "Konto zostało usunięte",
    });
  } catch (error) {
    next(error);
  }
};

const getUserSecurity = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Brak userId",
      });
    }

    const [rows] = await db.execute(
      `SELECT is_verified, is_strong FROM users WHERE id = ?`,
      [userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie istnieje",
      });
    }

    const user = rows[0];

    return res.json({
      success: true,
      is_verified: Boolean(user.is_verified),
      has_strong_password: Boolean(user.is_strong),
    });
  } catch (err) {
    console.error("SECURITY ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changeEmail,
  changePassword,
  deleteAccount,
  getUserSecurity,
};

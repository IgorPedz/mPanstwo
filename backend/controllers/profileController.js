const db = require("../db");
const bcrypt = require("bcrypt");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "Nieprawidłowy użytkownik" });
    }

    const [userRows] = await db.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const user = userRows[0];

    const [statsRows] = await db.query(
      `SELECT 
        title,
        value_number,
        value_text,
        icon,
        color
       FROM profile_stats
       WHERE user_id = ?
       ORDER BY id ASC`,
      [userId]
    );

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,

      stats: statsRows.map((s) => ({
        title: s.title,
        valueNumber: s.value_number,
        valueText: s.value_text,
        icon: s.icon,
        color: s.color,
      })),
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
      [userId]
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

    const [userRows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const validPassword = await bcrypt.compare(password, userRows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Błędne hasło" });
    }

    const [emailCheck] = await db.query("SELECT id FROM users WHERE email = ? AND id != ?", [email, userId]);
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

    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = req.body || {};

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
      [userId]
    );

    if (!userRows.length) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie znaleziony",
      });
    }

    const validPassword = await bcrypt.compare(
      oldPassword,
      userRows[0].password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Stare hasło jest błędne",
      });
    }

    const hashedPassword = await bcrypt.hash(cleanNew, 10);

    await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
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

    const [userRows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);
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

module.exports = {
  getProfile,
  updateProfile,
  changeEmail,
  changePassword,
  deleteAccount,
};

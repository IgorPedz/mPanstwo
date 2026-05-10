const db = require("../db");
const bcrypt = require("bcrypt");

const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "Nieprawidłowy użytkownik" });
    }

    // USER
    const [userRows] = await db.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const user = userRows[0];

    // STATS
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

    // RESPONSE
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

    // Weryfikacja hasła
    const [userRows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const validPassword = await bcrypt.compare(password, userRows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Błędne hasło" });
    }

    // Sprawdzenie czy email już istnieje
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
    const { oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "Stare i nowe hasło są wymagane" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Nowe hasło musi mieć co najmniej 6 znaków" });
    }

    // Weryfikacja starego hasła
    const [userRows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const validPassword = await bcrypt.compare(oldPassword, userRows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Stare hasło jest błędne" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

    res.json({
      message: "Hasło zostało zmienione",
    });
  } catch (error) {
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

    // Weryfikacja hasła
    const [userRows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const validPassword = await bcrypt.compare(password, userRows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Błędne hasło" });
    }

    // Usuń najpierw user_tiles (foreign key constraint)
    await db.query("DELETE FROM user_tiles WHERE user_id = ?", [userId]);

    // Usuń użytkownika
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

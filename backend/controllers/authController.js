const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email i hasło są wymagane" });
    }

    const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (userRows.length > 0) {
      return res.status(400).json({ message: "Użytkownik już istnieje" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name || "Użytkownik", email, hashedPassword]
    );

    res.status(201).json({ message: "Zarejestrowano pomyślnie" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    const errors = [];
    if (!email || email.trim() === "") errors.push("Email jest wymagany");
    if (!password || password.trim() === "") errors.push("Hasło jest wymagane");

    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0] });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "Hasło lub email jest błędny" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Hasło lub email jest błędny" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
      message: "Zalogowano pomyślnie",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};

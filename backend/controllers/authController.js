const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { updateUserActivity } = require("./activityController");
const { handleEvent } = require("../services/event.service");
const isStrongPassword = require("../utils/strongpassword");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email i hasło są wymagane" });
    }

    const [userRows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (userRows.length > 0) {
      return res.status(400).json({ message: "Użytkownik już istnieje" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const strongPassword = isStrongPassword(password);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, is_strong) VALUES (?, ?, ?, ?)",
      [name || "Użytkownik", email, hashedPassword, strongPassword ? 1 : 0],
    );

    const userId = result.insertId;

    const defaultStats = [
      {
        key: "trackedLaws",
        value_number: 0,
        value_text: null,
        icon: "documents",
        color: "indigo",
      },
      {
        key: "role",
        value_number: null,
        value_text: "Użytkownik",
        icon: "achievements",
        color: "purple",
      },
      {
        key: "votes",
        value_number: 0,
        value_text: null,
        icon: "vote",
        color: "blue",
      },
      {
        key: "opinions",
        value_number: 0,
        value_text: null,
        icon: "comments",
        color: "emerald",
      },
      {
        key: "courses",
        value_number: 0,
        value_text: null,
        icon: "courses",
        color: "purple",
      }
    ];

    const values = defaultStats.map((s) => [
      userId,
      s.key,
      s.value_number,
      s.value_text,
    ]);

    await db.query(
      `INSERT INTO user_stats
       (user_id, \`key\`, value_number, value_text)
       VALUES ?`,
      [values],
    );

    res.status(201).json({
      message: "Zarejestrowano pomyślnie",
      userId,
    });
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

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "Hasło lub email jest błędny" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Hasło lub email jest błędny" });
    }

    const streakResult = await updateUserActivity(user.id);

    if (streakResult.notify) {
      if (streakResult.streak >= 7) {
        await handleEvent(user.id, "LOGIN_STREAK_BIG", {
          streak: streakResult.streak,
        });
      } else if (streakResult.streak >= 3) {
        await handleEvent(user.id, "LOGIN_STREAK_SMALL", {
          streak: streakResult.streak,
        });
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        login_streak: streakResult.streak,
      },
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

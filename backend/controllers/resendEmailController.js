const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db = require("../db");
const sendMail = require("../utils/mailer");

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await db.execute(`SELECT id FROM users WHERE email = ?`, [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik z tym emailem nie istnieje",
      });
    }

    const token = crypto.randomUUID();

    const link = `http://localhost:5173/reset-password/${token}`;

    // 15 minut od teraz
    const expires = Date.now() + 15 * 60 * 1000;

    await db.execute(
      `UPDATE users
       SET reset_token = ?,
           reset_token_exp = ?
       WHERE email = ?`,
      [token, expires, email],
    );

    await sendMail({
      to: email,
      subject: "Reset hasła",
      html: `
        <h2>Reset hasła</h2>
        <p>Kliknij link, aby zresetować hasło:</p>
        <a href="${link}">${link}</a>
      `,
    });

    return res.json({
      success: true,
      message: "Link resetujący został wysłany",
    });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const sendSupport = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendMail({
      to: process.env.GMAIL_USER,
      subject: `Nowa wiadomość od ${name}`,
      from: email,
      html: `
        <h3>Nowa wiadomość</h3>
        <p><b>Imię:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Wiadomość:</b></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Brak danych",
      });
    }

    const [rows] = await db.execute(
      `SELECT id, reset_token_exp
       FROM users
       WHERE reset_token = ?`,
      [token.trim()],
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Token nieprawidłowy",
      });
    }

    const user = rows[0];

    const isExpired = Date.now() > Number(user.reset_token_exp);

    if (isExpired) {
      return res.status(400).json({
        success: false,
        message: "Token wygasł",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `UPDATE users
       SET password = ?,
           reset_token = NULL,
           reset_token_exp = NULL
       WHERE id = ?`,
      [hashedPassword, user.id],
    );

    return res.json({
      success: true,
      message: "Hasło zmienione",
    });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Błąd serwera",
    });
  }
};

const sendVerificationEmail = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Brak ID użytkownika",
      });
    }

    const [users] = await db.execute(
      `SELECT email, is_verified FROM users WHERE id = ?`,
      [userId],
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie istnieje",
      });
    }

    const user = users[0];

    if (user.is_verified) {
      console.log("INFO: User already verified");
      return res.json({
        success: true,
        message: "Email już zweryfikowany",
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = Date.now() + 60 * 60 * 1000;

    await db.execute(
      `UPDATE users 
       SET verification_code = ?, 
           verification_expires = ?
       WHERE id = ?`,
      [code, expiresAt, userId],
    );

    await sendMail({
      to: user.email,
      subject: "Weryfikacja email",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Weryfikacja konta</h2>
          <p>Twój kod weryfikacyjny:</p>
          <h1 style="letter-spacing: 4px;">${code}</h1>
          <p>Kod ważny przez 60 minut.</p>
        </div>
      `,
    });

    return res.json({
      success: true,
      message: "Kod został wysłany",
    });
  } catch (err) {
    console.error("SEND VERIFICATION ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId, code } = req.body;

    if (!userId || !code) {
      console.log("ERROR: Missing userId or code");
      return res.status(400).json({
        success: false,
        message: "Brak userId lub kodu",
      });
    }

    const [rows] = await db.execute(
      `SELECT verification_code, verification_expires, is_verified
       FROM users WHERE id = ?`,
      [userId],
    );

    if (rows.length === 0) {
      console.log("ERROR: User not found");
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie istnieje",
      });
    }

    const user = rows[0];

    if (user.is_verified) {
      console.log("INFO: Already verified");
      return res.json({
        success: true,
        message: "Email już zweryfikowany",
      });
    }

    if (
      !user.verification_code ||
      String(user.verification_code) !== String(code)
    ) {
      console.log("ERROR: Invalid code");
      return res.status(400).json({
        success: false,
        message: "Niepoprawny kod weryfikacyjny",
      });
    }

    const rawExpires = user.verification_expires;
    const expiresAt = Number(rawExpires);
    const now = Date.now();

    if (!rawExpires) {
      console.log("ERROR: verification_expires is NULL/empty");
      return res.status(400).json({
        success: false,
        message: "Brak daty wygaśnięcia kodu",
      });
    }

    if (!Number.isFinite(expiresAt)) {
      console.log("ERROR: invalid verification_expires format");
      return res.status(400).json({
        success: false,
        message: "Niepoprawna data wygaśnięcia kodu",
      });
    }

    if (expiresAt < now) {
      console.log("ERROR: code expired");
      return res.status(400).json({
        success: false,
        message: "Kod weryfikacyjny wygasł",
      });
    }

    await db.execute(
      `UPDATE users
       SET is_verified = 1,
           verification_code = NULL,
           verification_expires = NULL
       WHERE id = ?`,
      [userId],
    );

    return res.json({
      success: true,
      message: "Email zweryfikowany pomyślnie",
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const isVerified = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Brak userId",
      });
    }

    const [rows] = await db.execute(
      `SELECT is_verified FROM users WHERE id = ?`,
      [userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Użytkownik nie istnieje",
      });
    }

    return res.json({
      success: true,
      is_verified: Boolean(rows[0].is_verified),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  resetPassword,
  sendSupport,
  changePassword,
  sendVerificationEmail,
  verifyEmail,
  isVerified,
};

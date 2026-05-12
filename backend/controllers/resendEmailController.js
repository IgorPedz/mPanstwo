const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const db = require("../db");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

const resetPassword = async (req, res) => {
    console.log("📩 RESET PASSWORD HIT:", req.body);

    const { email } = req.body;

    const token = crypto.randomUUID();
    const link = `http://localhost:5173/reset-password/${token}`;

    try {
        await db.execute(
            `UPDATE users 
             SET reset_token = ?, 
                 reset_token_exp = DATE_ADD(NOW(), INTERVAL 15 MINUTE)
             WHERE email = ?`,
            [token, email]
        );

        const result = await transporter.sendMail({
            from: `"mPaństwo" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Reset hasła",
            html: `
                <h2>Reset hasła</h2>
                <p>Kliknij link, aby zresetować hasło:</p>
                <a href="${link}">${link}</a>
            `,
        });
        
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sendSupport = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const result = await transporter.sendMail({
            from: email,
            to: process.env.GMAIL_USER,
            subject: `Nowa wiadomość od ${name}`,
            html: `
        <h3>Nowa wiadomość</h3>
        <p><b>Imię:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Wiadomość:</b></p>
        <p>${message}</p>
      `,
        });

        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { token, password } = req.body;
    console.log(token,password)
    try {
        if (!token || !password) {
            return res.status(400).json({ error: "Brak danych" });
        }

        const [rows] = await db.execute(
            `SELECT * FROM users 
       WHERE reset_token = ? 
       AND reset_token_exp > NOW()`,
            [token]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: "Token nieprawidłowy lub wygasł" });
        }

        const user = rows[0];

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            `UPDATE users 
       SET password = ?, reset_token = NULL, reset_token_exp = NULL 
       WHERE id = ?`,
            [hashedPassword, user.id]
        );

        return res.json({ success: true, message: "Hasło zmienione" });
    } catch (err) {
        console.error("RESET ERROR:", err);
        res.status(500).json({ error: "Błąd serwera" });
    }
};


module.exports = {
    resetPassword,
    sendSupport,
    changePassword
};
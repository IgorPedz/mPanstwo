require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) throw err;
    console.log("Połączono z MySQL");
});

// ================== REJESTRACJA ==================
app.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name || "Użytkownik", email, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ message: "Użytkownik już istnieje" });
                }
                res.status(201).json({ message: "Zarejestrowano pomyślnie" });
            }
        );
    } catch (err) {
        res.status(500).json({ message: "Błąd serwera" });
    }
});


// ================== LOGOWANIE ==================
app.post("/login", async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { email, password, rememberMe } = req.body;

        // 🔹 WALIDACJA PÓL
        const errors = [];
        if (!email || email.trim() === "") errors.push("Email jest wymagany");
        if (!password || password.trim() === "") errors.push("Hasło jest wymagane");

        if (errors.length > 0) {
            return res.status(400).json({ message: errors[0] });
        }

        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error("MYSQL ERROR:", err);
                return res.status(500).json({ message: "Błąd serwera" });
            }

            if (!results || results.length === 0) {
                return res.status(400).json({
                    message: "Hasło lub email jest błędny"
                });
            }

            const user = results[0]; 

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(400).json({
                    message: "Hasło lub email jest błędny"
                });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: rememberMe ? "30d" : "10s" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
            });

            res.json({
                user: { email: user.email, name: user.name },
                message: "Zalogowano pomyślnie"
            });
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Błąd serwera" });
    }
});


// ================== POBIERANIE CONTENTU DO DASHBOARD ==================
app.get("/dashboard_content", (req, res) => {
    db.query("SELECT * FROM dashboard_content", (err, results) => {
        if (err)
            return res.status(500).json({ message: "Błąd serwera" });

        if (results.length === 0)
            return res.status(400).json({ message: "Brak contentu do dashboardu!" });

        res.json(results);
    });
});
app.listen(process.env.PORT, () =>
    console.log(`Serwer działa na porcie ${process.env.PORT}`)
);
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

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
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Błąd serwera" });
        if (results.length === 0) return res.status(400).json({ message: "Nieprawidłowy email lub hasło" });

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).json({ message: "Nieprawidłowy email lub hasło" });

        // Token z id, email i imieniem
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: { email: user.email, name: user.name }
        });
    });
});

app.listen(process.env.PORT, () =>
    console.log(`Serwer działa na porcie ${process.env.PORT}`)
);
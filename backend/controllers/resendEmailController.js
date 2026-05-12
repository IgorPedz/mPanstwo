const crypto = require("crypto");
const { Resend } = require("resend");

console.log("🔑 API KEY:", process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

const resetPassword = async (req, res) => {
    console.log("📩 RESET PASSWORD HIT:", req.body);

    const { email } = req.body;

    const token = crypto.randomUUID();
    const link = `http://localhost:5173/reset-password/${token}`;

    try {
        console.log("➡️ Sending reset email to:", email);

        const result = await resend.emails.send({
            from: "mPaństwo <onboarding@resend.dev>",
            to: email,
            subject: "Reset hasła",
            html: `
                <h2>Reset hasła</h2>
                <p>Kliknij link, aby zresetować hasło:</p>
                <a href="${link}">${link}</a>
            `
        });

        console.log("✅ RESET EMAIL RESULT:", result);

        res.json({ success: true, result });

    } catch (err) {
        console.log("❌ RESET ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

const sendSupport = async (req, res) => {

    const { name, email, message } = req.body;

    try {

        const result = await resend.emails.send({
            from: "mPaństwo Support <onboarding@resend.dev>",
            to: "qigorq@wp.pl",
            subject: `Nowa wiadomość od ${name}`,
            html: `
                <h3>Nowa wiadomość</h3>
                <p><b>Imię:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Wiadomość:</b></p>    
                <p>${message}</p>
            `
        });

        res.json({ success: true, result });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    resetPassword,
    sendSupport
};
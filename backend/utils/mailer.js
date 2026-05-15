const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendMail = async ({ to, subject, html, from }) => {
  return transporter.sendMail({
    from: from || `"mPaństwo" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
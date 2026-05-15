const express = require("express");
const { resetPassword, sendSupport, changePassword,sendVerificationEmail,verifyEmail, isVerified } = require("../controllers/resendEmailController.js");

const router = express.Router();

router.post("/reset-password", resetPassword);
router.post("/support", sendSupport);
router.post("/change-password",changePassword )
router.post("/send-verification-email", sendVerificationEmail)
router.post("/verify-email",verifyEmail)
router.post("/check-verify",isVerified)

module.exports = router
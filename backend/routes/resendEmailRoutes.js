const express = require("express");
const { resetPassword, sendSupport } = require("../controllers/resendEmailController.js");

const router = express.Router();

router.post("/reset-password", resetPassword);
router.post("/support", sendSupport);

module.exports = router
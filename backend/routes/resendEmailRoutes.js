const express = require("express");
const { resetPassword, sendSupport, changePassword } = require("../controllers/resendEmailController.js");

const router = express.Router();

router.post("/reset-password", resetPassword);
router.post("/support", sendSupport);
router.post("/change-password",changePassword )
module.exports = router
const express = require("express");
const { getProfile, updateProfile, changeEmail, changePassword, deleteAccount} = require("../controllers/profileController");

const router = express.Router();
router.get("/profile/:userId", getProfile);
router.put("/profile/:userId", updateProfile);
router.put("/profile/:userId/email", changeEmail);
router.put("/profile/:userId/password", changePassword);
router.delete("/profile/:userId", deleteAccount);

module.exports = router;

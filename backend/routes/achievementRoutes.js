const express = require("express");

const router = express.Router();

const { getUserAchievements } = require("../controllers/achievementController");

router.get("/achievements", getUserAchievements);

module.exports = router;

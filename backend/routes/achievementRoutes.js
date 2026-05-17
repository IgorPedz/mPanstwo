const express = require("express");

const router = express.Router();

const { getUserAchievements } = require("../controllers/achievementController");

router.get("/achievements/:id", getUserAchievements);

module.exports = router;

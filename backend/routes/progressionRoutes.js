const express = require("express");

const router = express.Router();

const { getProgression } = require("../controllers/progressionController");

router.get("/progression/:id", getProgression);

module.exports = router;

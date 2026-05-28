const express = require("express");

const router = express.Router();
const { getRanks } = require("../controllers/rankController");

router.get("/ranks", getRanks);

module.exports = router;

const express = require("express");
const { getJudicialNews } = require("../controllers/judicialController");

const router = express.Router();

router.get("/judicial/news/:slug", getJudicialNews);

module.exports = router;

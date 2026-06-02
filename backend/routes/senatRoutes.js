const express = require("express");
const {
  getSenatLeadership,
  getSenatClubs,
  getSenatProceedings,
  getSenatorPhoto,
} = require("../controllers/senatController");

const router = express.Router();

router.get("/senat/leadership",           getSenatLeadership);
router.get("/senat/clubs",                getSenatClubs);
router.get("/senat/proceedings",          getSenatProceedings);
router.get("/senat/senator/:id/photo",    getSenatorPhoto);

module.exports = router;

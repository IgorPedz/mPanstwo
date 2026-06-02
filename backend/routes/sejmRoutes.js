const express = require("express");
const {
  getSejmLeadership,
  getSejmClubs,
  getSejmProceedings,
  getMPPhoto,
  getClubLogo,
} = require("../controllers/sejmController");

const router = express.Router();

router.get("/sejm/leadership",        getSejmLeadership);
router.get("/sejm/clubs",             getSejmClubs);
router.get("/sejm/proceedings",       getSejmProceedings);
router.get("/sejm/mp/:id/photo",      getMPPhoto);
router.get("/sejm/clubs/:id/logo",    getClubLogo);

module.exports = router;

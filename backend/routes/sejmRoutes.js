const express = require("express");
const {
  getSejmLeadership,
  getSejmClubs,
  getSejmProceedings,
  getMPPhoto,
  getClubLogo,
  getAllMPs,
  getMPDetails,
  getMPVotings,
  getMPCommittees,
  getMPInterpellations,
  getMPWrittenQuestions,
  getMPRating,
  rateMp,
} = require("../controllers/sejmController");
const router = express.Router();

router.get("/sejm/leadership",         getSejmLeadership);
router.get("/sejm/clubs",              getSejmClubs);
router.get("/sejm/proceedings",        getSejmProceedings);
router.get("/sejm/mps",               getAllMPs);
router.get("/sejm/mp/:id/photo",       getMPPhoto);
router.get("/sejm/mp/:id/details",     getMPDetails);
router.get("/sejm/mp/:id/votings",     getMPVotings);
router.get("/sejm/mp/:id/committees",       getMPCommittees);
router.get("/sejm/mp/:id/interpellations",  getMPInterpellations);
router.get("/sejm/mp/:id/written-questions",getMPWrittenQuestions);
router.get("/sejm/mp/:id/rating",      getMPRating);
router.post("/sejm/mp/:id/rate",       rateMp);
router.get("/sejm/clubs/:id/logo",     getClubLogo);

module.exports = router;

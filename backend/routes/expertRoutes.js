const express = require("express");
const expertMiddleware = require("../middleware/expertMiddleware");
const {
  exportUsers,
  exportOpinions,
  exportMpRatings,
  exportSurveys,
  exportMpRatingsSummary,
} = require("../controllers/expertController");

const router = express.Router();

router.use("/expert", expertMiddleware);

router.get("/expert/export/users",              exportUsers);
router.get("/expert/export/opinions",           exportOpinions);
router.get("/expert/export/mp-ratings",         exportMpRatings);
router.get("/expert/export/surveys",            exportSurveys);
router.get("/expert/export/mp-ratings-summary", exportMpRatingsSummary);

module.exports = router;

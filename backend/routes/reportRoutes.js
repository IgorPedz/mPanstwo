const express = require("express");
const moderatorMiddleware = require("../middleware/moderatorMiddleware");
const {
  reportOpinion,
  getReports,
  dismissReport,
  deleteReportedOpinion,
} = require("../controllers/reportController");

const router = express.Router();

router.post("/report/opinion/:id", reportOpinion);

router.get("/admin/reports",                       moderatorMiddleware, getReports);
router.put("/admin/reports/:id/dismiss",           moderatorMiddleware, dismissReport);
router.delete("/admin/reports/:id/delete-opinion", moderatorMiddleware, deleteReportedOpinion);

module.exports = router;

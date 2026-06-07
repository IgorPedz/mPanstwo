const express             = require("express");
const moderatorMiddleware = require("../middleware/moderatorMiddleware");
const {
  submitAppeal,
  getAppealStatus,
  getAppeals,
  approveAppeal,
  rejectAppeal,
} = require("../controllers/appealController");

const router = express.Router();

// Endpointy dla zbanowanego użytkownika (globalne authMiddleware wystarczy)
router.post("/appeal",        submitAppeal);
router.get ("/appeal/status", getAppealStatus);

// Admin/Moderator endpoints
router.get("/admin/appeals",              moderatorMiddleware, getAppeals);
router.put("/admin/appeals/:id/approve",  moderatorMiddleware, approveAppeal);
router.put("/admin/appeals/:id/reject",   moderatorMiddleware, rejectAppeal);

module.exports = router;

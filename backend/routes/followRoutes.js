const express = require("express");
const { followInstitution, unfollowInstitution, getFollows, markSeen } = require("../controllers/followController");
const { runFollowNewsCheck } = require("../follow-news-check");

const router = express.Router();

router.post("/follows", followInstitution);
router.delete("/follows/:institutionId", unfollowInstitution);
router.get("/follows", getFollows);
router.patch("/follows/:institutionId/seen", markSeen);

// Ręczny trigger — tylko do testowania
router.post("/follows/check-now", async (req, res) => {
  try {
    await runFollowNewsCheck();
    res.json({ success: true, message: "Sprawdzanie zakończone" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

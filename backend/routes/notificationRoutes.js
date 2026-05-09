const router = require("express").Router();

const {
  getNotifications,
} = require("../controllers/notificationController");

router.get("/notifications", getNotifications);

module.exports = router;
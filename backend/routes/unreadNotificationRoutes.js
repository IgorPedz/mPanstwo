const router = require("express").Router();

const {
  getUnreadNotifications, markAsRead,clearReadNotifications
} = require("../controllers/unreadNotificationController");

router.get("/notifications", getUnreadNotifications);
router.patch("/notifications/:id/read", markAsRead);
router.delete("/notifications/read", clearReadNotifications);
module.exports = router;
const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getUsers,
  updateUserRole,
  deleteUser,
  banUser,
  unbanUser,
  getStats,
  getOpinions,
  deleteOpinion,
  getRatings,
  deleteRating,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/admin/users",            adminMiddleware, getUsers);
router.put("/admin/users/:id/role",   adminMiddleware, updateUserRole);
router.put("/admin/users/:id/ban",    adminMiddleware, banUser);
router.put("/admin/users/:id/unban",  adminMiddleware, unbanUser);
router.delete("/admin/users/:id",     adminMiddleware, deleteUser);
router.get("/admin/stats",            adminMiddleware, getStats);
router.get("/admin/opinions",         adminMiddleware, getOpinions);
router.delete("/admin/opinions/:id",  adminMiddleware, deleteOpinion);
router.get("/admin/ratings",          adminMiddleware, getRatings);
router.delete("/admin/ratings/:id",   adminMiddleware, deleteRating);

module.exports = router;

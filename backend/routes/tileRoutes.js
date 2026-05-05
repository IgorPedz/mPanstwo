const express = require("express");
const { saveUserTiles, getUserTiles } = require("../controllers/tileController");

const router = express.Router();
router.post("/user_tiles", saveUserTiles);
router.get("/user_tiles/:userId", getUserTiles);

module.exports = router;

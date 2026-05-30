const express = require("express");

const router = express.Router();

const { getBlocks } = require("../controllers/blocksController.js");

router.get("/courses/:id/blocks", getBlocks);

module.exports = router;

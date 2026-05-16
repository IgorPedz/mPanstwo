const express = require("express");

const router = express.Router();

const { getCategories } = require("../controllers/categoryController");

router.get("/category", getCategories);

module.exports = router;

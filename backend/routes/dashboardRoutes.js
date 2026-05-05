const express = require("express");
const { getDashboardContent } = require("../controllers/dashboardController");

const router = express.Router();
router.get("/dashboard_content", getDashboardContent);

module.exports = router;

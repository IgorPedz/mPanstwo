const express = require("express");
const {
  getMinistryNews,
  getPrezydentPlNews,
} = require("../controllers/newsController");

const router = express.Router();

router.get("/news/president",                getPrezydentPlNews);
router.get("/news/presidential_chancellery", getPrezydentPlNews);
router.get("/news/:slug",                    getMinistryNews);

module.exports = router;

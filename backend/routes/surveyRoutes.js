const express = require("express");
const { getSurveys, submitSurvey, getCompletedSurveys } = require("../controllers/surveyController");

const router = express.Router();

router.get("/surveys", getSurveys);

router.post("/surveys/:id/submit", submitSurvey);

router.get("/surveys/completed", getCompletedSurveys);

module.exports = router;
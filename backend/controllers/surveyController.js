const db = require("../db");
const sendNotification = require("../utils/notification");

// 🔥 GET ALL SURVEYS
const getSurveys = async (req, res) => {
  try {
    const userId = req.query.userId;

    const [surveys] = await db.query("SELECT * FROM surveys");

    const [answers] = userId
      ? await db.query(
          "SELECT survey_id FROM survey_answers WHERE user_id = ?",
          [userId]
        )
      : [[]];

    const answeredIds = new Set(answers.map((a) => a.survey_id));

    const full = await Promise.all(
      surveys.map(async (survey) => {
        const [questions] = await db.query(
          "SELECT * FROM questions WHERE survey_id = ?",
          [survey.id]
        );

        const withOptions = await Promise.all(
          questions.map(async (q) => {
            const [options] = await db.query(
              "SELECT label, value FROM options WHERE question_id = ?",
              [q.id]
            );

            return {
              id: q.id,
              title: q.title,
              options,
            };
          })
        );

        return {
          ...survey,
          questions: withOptions,
          answered: answeredIds.has(survey.id),
        };
      })
    );

    res.json(full);
  } catch (err) {
    console.error("GET SURVEYS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
};

const submitSurvey = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { answers = {}, userId = null } = req.body;

    if (!answers) {
      return res.status(400).json({ error: "No answers provided" });
    }

    await db.query(
      `INSERT INTO survey_answers (survey_id, user_id, answers)
       VALUES (?, ?, ?)`,
      [surveyId, userId, JSON.stringify(answers)]
    );

    await sendNotification({
      type: "SURVEY_COMPLETED",
      message: "+50 XP za ukończenie ankiety",
      userId,
    });

    return res.json({
      success: true,
      message: "Survey saved",
    });
  } catch (err) {
    console.error("SUBMIT SURVEY ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

// 🔥 COMPLETED SURVEYS
const getCompletedSurveys = async (req, res) => {
  try {
    const userId = req.query.userId;

    const [surveys] = await db.query(
      `
      SELECT 
        s.id,
        s.title,
        s.reward,
        s.category,
        s.deadline,
        sa.created_at as completed_at,
        sa.answers
      FROM survey_answers sa
      JOIN surveys s ON s.id = sa.survey_id
      WHERE sa.user_id = ?
      ORDER BY sa.created_at DESC
      `,
      [userId]
    );

    const [questions] = await db.query(
      `
      SELECT id, survey_id, title
      FROM questions
      WHERE survey_id IN (
        SELECT DISTINCT survey_id
        FROM survey_answers
        WHERE user_id = ?
      )
      ORDER BY id ASC
      `,
      [userId]
    );

    const groupedQuestions = questions.reduce((acc, q) => {
      if (!acc[q.survey_id]) acc[q.survey_id] = [];
      acc[q.survey_id].push(q);
      return acc;
    }, {});

    const parsed = surveys.map((survey) => ({
      ...survey,
      answers: survey.answers ? JSON.parse(survey.answers) : {},
      questions: groupedQuestions[survey.id] || [],
    }));

    res.json(parsed);
  } catch (err) {
    console.error("GET COMPLETED SURVEYS ERROR:", err);
    res.status(500).json({
      error: "Failed to fetch completed surveys",
    });
  }
};

module.exports = {
  getSurveys,
  submitSurvey,
  getCompletedSurveys,
};
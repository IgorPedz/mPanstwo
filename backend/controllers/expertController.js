const db = require("../db");

const toCSV = (rows) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape  = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines   = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  return lines.join("\r\n");
};

const sendFile = (res, data, filename, format) => {
  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}.csv"`);
    res.send("﻿" + toCSV(data)); 
  } else {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}.json"`);
    res.json(data);
  }
};

const exportUsers = async (req, res, next) => {
  try {
    const format = req.query.format === "csv" ? "csv" : "json";
    const [rows] = await db.query(
      `SELECT id, name, email, role, xp, login_streak, active_days,
              is_verified, created_at
       FROM users
       ORDER BY created_at DESC`
    );
    sendFile(res, rows, "users", format);
  } catch (err) {
    next(err);
  }
};

const exportOpinions = async (req, res, next) => {
  try {
    const format = req.query.format === "csv" ? "csv" : "json";
    const [rows] = await db.query(
      `SELECT lo.id, lo.print_num, lo.content, lo.created_at,
              u.name AS user_name, u.email AS user_email
       FROM legislation_opinions lo
       JOIN users u ON u.id = lo.user_id
       ORDER BY lo.created_at DESC`
    );
    sendFile(res, rows, "opinions", format);
  } catch (err) {
    next(err);
  }
};

const exportMpRatings = async (req, res, next) => {
  try {
    const format = req.query.format === "csv" ? "csv" : "json";
    const [rows] = await db.query(
      `SELECT r.id, r.mp_id, r.rating, r.club, r.created_at,
              u.name AS user_name, u.email AS user_email
       FROM mp_ratings r
       JOIN users u ON u.id = r.user_id
       ORDER BY r.created_at DESC`
    );
    sendFile(res, rows, "mp-ratings", format);
  } catch (err) {
    next(err);
  }
};

const exportSurveys = async (req, res, next) => {
  try {
    const format = req.query.format === "csv" ? "csv" : "json";
    const [rows] = await db.query(
      `SELECT sa.id, sa.survey_id, s.title AS survey_title,
              sa.answers, sa.created_at,
              u.name AS user_name, u.email AS user_email
       FROM survey_answers sa
       JOIN surveys s ON s.id = sa.survey_id
       JOIN users u ON u.id = sa.user_id
       ORDER BY sa.created_at DESC`
    );
    sendFile(res, rows, "surveys", format);
  } catch (err) {
    next(err);
  }
};

const exportMpRatingsSummary = async (req, res, next) => {
  try {
    const format = req.query.format === "csv" ? "csv" : "json";
    const [rows] = await db.query(
      `SELECT mp_id, club,
              COUNT(*)             AS votes_count,
              ROUND(AVG(rating),2) AS avg_rating,
              MIN(rating)          AS min_rating,
              MAX(rating)          AS max_rating
       FROM mp_ratings
       GROUP BY mp_id, club
       ORDER BY avg_rating DESC`
    );
    sendFile(res, rows, "mp-ratings-summary", format);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  exportUsers,
  exportOpinions,
  exportMpRatings,
  exportSurveys,
  exportMpRatingsSummary,
};

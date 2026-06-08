const db = require("../db");
const sendNotification = require("../utils/notification");

// POST /report/opinion/:id  { reason }
const reportOpinion = async (req, res, next) => {
  try {
    const reporterId = req.user?.id;
    if (!reporterId) return res.status(401).json({ message: "Wymagane logowanie" });

    const opinionId = req.params.id;
    const reason    = (req.body.reason ?? "").trim();
    if (!reason) return res.status(400).json({ message: "Podaj powód zgłoszenia" });
    if (reason.length > 500) return res.status(400).json({ message: "Powód zbyt długi (max 500 znaków)" });

    // Sprawdź czy opinia istnieje
    const [[opinion]] = await db.query(
      "SELECT id, user_id FROM legislation_opinions WHERE id = ?", [opinionId]
    );
    if (!opinion) return res.status(404).json({ message: "Opinia nie istnieje" });
    if (opinion.user_id === reporterId) {
      return res.status(400).json({ message: "Nie możesz zgłosić własnej opinii" });
    }

    await db.query(
      `INSERT INTO opinion_reports (opinion_id, reporter_id, reason)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE reason = VALUES(reason), status = 'pending', created_at = NOW()`,
      [opinionId, reporterId, reason]
    );

    res.json({ message: "Zgłoszenie zostało wysłane" });
  } catch (err) {
    next(err);
  }
};

// GET /admin/reports?status=pending&page=1&limit=20
const getReports = async (req, res, next) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const status = req.query.status || "pending";

    const statusFilter = ["pending", "reviewed", "dismissed", "all"].includes(status)
      ? status : "pending";

    const where = statusFilter === "all" ? "" : "WHERE r.status = ?";
    const params = statusFilter === "all" ? [] : [statusFilter];

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) AS total FROM opinion_reports r ${where}`, params
    );

    const [rows] = await db.query(
      `SELECT
         r.id,
         r.reason,
         r.status,
         r.created_at,
         r.reviewed_at,
         lo.id          AS opinion_id,
         lo.content     AS opinion_content,
         lo.print_num,
         lo.created_at  AS opinion_created_at,
         reporter.id    AS reporter_id,
         reporter.name  AS reporter_name,
         reporter.email AS reporter_email,
         author.id      AS author_id,
         author.name    AS author_name,
         author.email   AS author_email,
         author.role    AS author_role,
         reviewer.name  AS reviewer_name,
         reviewer.role  AS reviewer_role
       FROM opinion_reports r
       JOIN legislation_opinions lo ON lo.id = r.opinion_id
       JOIN users reporter ON reporter.id = r.reporter_id
       JOIN users author   ON author.id   = lo.user_id
       LEFT JOIN users reviewer ON reviewer.id = r.reviewed_by
       ${where}
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ reports: rows, total, page, limit });
  } catch (err) {
    next(err);
  }
};

// PUT /admin/reports/:id/dismiss
const dismissReport = async (req, res, next) => {
  try {
    // Pobierz dane przed aktualizacją
    const [[report]] = await db.query(
      `SELECT r.reporter_id, lo.print_num
       FROM opinion_reports r
       JOIN legislation_opinions lo ON lo.id = r.opinion_id
       WHERE r.id = ?`,
      [req.params.id]
    );
    if (!report) return res.status(404).json({ message: "Zgłoszenie nie istnieje" });

    await db.query(
      "UPDATE opinion_reports SET status = 'dismissed', reviewed_by = ?, reviewed_at = NOW() WHERE id = ?",
      [req.user.id, req.params.id]
    );

    // Powiadom zgłaszającego
    sendNotification({
      type: "REPORT_DISMISSED",
      userId: report.reporter_id,
      data: {
        message: `Twoje zgłoszenie dotyczące opinii do druku ${report.print_num} zostało odrzucone — opinia nie naruszała zasad.`,
        slug: "reportDismissed"
      },
    }).catch(() => {});

    res.json({ message: "Zgłoszenie odrzucone" });
  } catch (err) {
    next(err);
  }
};

// DELETE /admin/reports/:id/delete-opinion  (usuwa opinię + oznacza raport jako reviewed)
const deleteReportedOpinion = async (req, res, next) => {
  try {
    const [[report]] = await db.query(
      `SELECT r.opinion_id, lo.print_num
       FROM opinion_reports r
       JOIN legislation_opinions lo ON lo.id = r.opinion_id
       WHERE r.id = ?`,
      [req.params.id]
    );
    if (!report) return res.status(404).json({ message: "Zgłoszenie nie istnieje" });

    // Pobierz wszystkich zgłaszających (żeby powiadomić każdego)
    const [reporters] = await db.query(
      "SELECT reporter_id FROM opinion_reports WHERE opinion_id = ? AND status = 'pending'",
      [report.opinion_id]
    );

    await db.query("DELETE FROM legislation_opinions WHERE id = ?", [report.opinion_id]);
    await db.query(
      "UPDATE opinion_reports SET status = 'reviewed', reviewed_by = ?, reviewed_at = NOW() WHERE opinion_id = ?",
      [req.user.id, report.opinion_id]
    );

    // Powiadom wszystkich zgłaszających
    for (const { reporter_id } of reporters) {
      sendNotification({
        type: "REPORT_RESOLVED",
        userId: reporter_id,
        data: {
          message: `Twoje zgłoszenie dotyczące opinii do druku ${report.print_num} zostało rozpatrzone — opinia została usunięta.`,
          slug: "reportResolved"
        },
      }).catch(() => {});
    }

    res.json({ message: "Opinia usunięta, zgłoszenie zamknięte" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  reportOpinion,
  getReports,
  dismissReport,
  deleteReportedOpinion,
};

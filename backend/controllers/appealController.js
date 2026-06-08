const db             = require("../db");
const sendNotification = require("../utils/notification");

const submitAppeal = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Wymagane logowanie" });

    const [[user]] = await db.query("SELECT role FROM users WHERE id = ?", [userId]);
    if (!user || user.role !== "Zbanowany") {
      return res.status(403).json({ message: "Odwołanie dotyczy tylko zbanowanych kont" });
    }

    const reason = (req.body.reason ?? "").trim();
    if (!reason)           return res.status(400).json({ message: "Podaj treść odwołania" });
    if (reason.length > 1000) return res.status(400).json({ message: "Treść zbyt długa (max 1000 znaków)" });

    const [[existing]] = await db.query(
      "SELECT id FROM ban_appeals WHERE user_id = ? AND status = 'pending'",
      [userId]
    );
    if (existing) {
      return res.status(409).json({ message: "Masz już oczekujące odwołanie" });
    }

    await db.query(
      "INSERT INTO ban_appeals (user_id, reason) VALUES (?, ?)",
      [userId, reason]
    );

    res.json({ message: "Odwołanie zostało wysłane" });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /appeal/status  — aktualny status odwołania zbanowanego usera ──── */
const getAppealStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Wymagane logowanie" });

    const [[appeal]] = await db.query(
      `SELECT id, reason, admin_response, status, created_at, reviewed_at
       FROM ban_appeals WHERE user_id = ?
       ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    res.json({ appeal: appeal ?? null });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /admin/appeals  — lista odwołań dla admina ────────────────────── */
const getAppeals = async (req, res, next) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const status = ["pending", "approved", "rejected", "all"].includes(req.query.status)
      ? req.query.status : "pending";

    const where  = status === "all" ? "" : "WHERE a.status = ?";
    const params = status === "all" ? [] : [status];

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) AS total FROM ban_appeals a ${where}`, params
    );

    const [rows] = await db.query(
      `SELECT
         a.id, a.reason, a.admin_response, a.status,
         a.created_at, a.reviewed_at,
         u.id    AS user_id,
         u.name  AS user_name,
         u.email AS user_email,
         u.role  AS user_role,
         r.name  AS reviewer_name
       FROM ban_appeals a
       JOIN users u ON u.id = a.user_id
       LEFT JOIN users r ON r.id = a.reviewed_by
       ${where}
       ORDER BY a.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ appeals: rows, total, page, limit });
  } catch (err) {
    next(err);
  }
};

/* ─── PUT /admin/appeals/:id/approve ─────────────────────────────────────── */
const approveAppeal = async (req, res, next) => {
  try {
    const adminId = req.user.id;

    const [[appeal]] = await db.query(
      "SELECT id, user_id, status FROM ban_appeals WHERE id = ?",
      [req.params.id]
    );
    if (!appeal) return res.status(404).json({ message: "Odwołanie nie istnieje" });
    if (appeal.status !== "pending") {
      return res.status(409).json({ message: "Odwołanie już zostało rozpatrzone" });
    }

    await db.query("UPDATE users SET role = 'Użytkownik' WHERE id = ?", [appeal.user_id]);
    await db.query(
      `UPDATE ban_appeals
       SET status = 'approved', reviewed_at = NOW(), reviewed_by = ?
       WHERE id = ?`,
      [adminId, appeal.id]
    );

    sendNotification({
      type: "APPEAL_APPROVED",
      userId: appeal.user_id,
      data: { message: "Twoje odwołanie zostało rozpatrzone pozytywnie — konto zostało odblokowane. Możesz się teraz zalogować.", slug: "unbanSuccess" },
    }).catch(() => {});

    res.json({ message: "Odwołanie zatwierdzone, konto odblokowane" });
  } catch (err) {
    next(err);
  }
};

/* ─── PUT /admin/appeals/:id/reject ─────────────────────────────────────── */
const rejectAppeal = async (req, res, next) => {
  try {
    const adminId  = req.user.id;
    const response = (req.body.response ?? "").trim();

    const [[appeal]] = await db.query(
      "SELECT id, user_id, status FROM ban_appeals WHERE id = ?",
      [req.params.id]
    );
    if (!appeal) return res.status(404).json({ message: "Odwołanie nie istnieje" });
    if (appeal.status !== "pending") {
      return res.status(409).json({ message: "Odwołanie już zostało rozpatrzone" });
    }

    await db.query(
      `UPDATE ban_appeals
       SET status = 'rejected', admin_response = ?, reviewed_at = NOW(), reviewed_by = ?
       WHERE id = ?`,
      [response || null, adminId, appeal.id]
    );

    sendNotification({
      type: "APPEAL_REJECTED",
      userId: appeal.user_id,
      data: {
        message: response
          ? `Twoje odwołanie zostało odrzucone. Odpowiedź administratora: ${response}`
          : "Twoje odwołanie zostało odrzucone przez administratora.",
        slug: "unbanUnsuccess"
      },
    }).catch(() => {});

    res.json({ message: "Odwołanie odrzucone" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitAppeal,
  getAppealStatus,
  getAppeals,
  approveAppeal,
  rejectAppeal,
};

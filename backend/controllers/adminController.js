const db = require("../db");

const ALLOWED_ROLES = ["Użytkownik", "Administrator", "Moderator", "Ekspert", "Zbanowany"];

const getUsers = async (req, res, next) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;
    const search = req.query.search?.trim() || "";
    const role   = req.query.role?.trim()   || "";

    let where  = "WHERE 1=1";
    const params = [];

    if (search) {
      where += " AND (name LIKE ? OR email LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    if (role) {
      where += " AND role = ?";
      params.push(role);
    }

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) AS total FROM users ${where}`,
      params
    );

    const [rows] = await db.query(
      `SELECT id, name, email, role, xp, login_streak, active_days, created_at, is_verified
       FROM users ${where}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ users: rows, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { id }   = req.params;
    const { role } = req.body;

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: "Nieprawidłowa rola" });
    }
    if (Number(id) === req.user.id) {
      return res.status(400).json({ message: "Nie możesz zmienić własnej roli" });
    }

    await db.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    res.json({ message: "Rola zaktualizowana" });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Number(id) === req.user.id) {
      return res.status(400).json({ message: "Nie możesz usunąć własnego konta" });
    }
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "Użytkownik usunięty" });
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [[totals]] = await db.query(
      `SELECT
        COUNT(*) AS total,
        SUM(role = 'Administrator') AS admins,
        SUM(role = 'Moderator')     AS moderators,
        SUM(role = 'Ekspert')       AS experts,
        SUM(role = 'Użytkownik')    AS users,
        SUM(is_verified = 1)        AS verified
       FROM users`
    );

    const [daily] = await db.query(
      `SELECT DATE(created_at) AS day, COUNT(*) AS count
       FROM users
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY day ASC`
    );

    const [opinionCount] = await db.query(
      "SELECT COUNT(*) AS total FROM legislation_opinions"
    );
    const [ratingCount] = await db.query(
      "SELECT COUNT(*) AS total FROM mp_ratings"
    );

    res.json({
      users: totals,
      registrationsLast30: daily,
      opinions: opinionCount[0].total,
      mpRatings: ratingCount[0].total,
    });
  } catch (err) {
    next(err);
  }
};

const getOpinions = async (req, res, next) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;

    const [[{ total }]] = await db.query(
      "SELECT COUNT(*) AS total FROM legislation_opinions"
    );

    const [rows] = await db.query(
      `SELECT lo.id, lo.content, lo.created_at, lo.print_num,
              u.id AS user_id, u.name AS user_name, u.email AS user_email
       FROM legislation_opinions lo
       JOIN users u ON u.id = lo.user_id
       ORDER BY lo.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({ opinions: rows, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const deleteOpinion = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM legislation_opinions WHERE id = ?", [id]);
    res.json({ message: "Opinia usunięta" });
  } catch (err) {
    next(err);
  }
};

const getRatings = async (req, res, next) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;

    const [[{ total }]] = await db.query(
      "SELECT COUNT(*) AS total FROM mp_ratings"
    );

    const [rows] = await db.query(
      `SELECT r.id, r.mp_id, r.rating, r.club, r.created_at,
              u.id AS user_id, u.name AS user_name, u.email AS user_email
       FROM mp_ratings r
       JOIN users u ON u.id = r.user_id
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({ ratings: rows, total, page, limit });
  } catch (err) {
    next(err);
  }
};

const deleteRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM mp_ratings WHERE id = ?", [id]);
    res.json({ message: "Ocena usunięta" });
  } catch (err) {
    next(err);
  }
};

const banUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Number(id) === req.user.id) {
      return res.status(400).json({ message: "Nie możesz zbanować własnego konta" });
    }
    const [[target]] = await db.query("SELECT role FROM users WHERE id = ?", [id]);
    if (!target) return res.status(404).json({ message: "Użytkownik nie istnieje" });
    if (target.role === "Administrator") {
      return res.status(403).json({ message: "Nie możesz zbanować administratora" });
    }
    await db.query("UPDATE users SET role = 'Zbanowany' WHERE id = ?", [id]);
    res.json({ message: "Użytkownik zbanowany" });
  } catch (err) {
    next(err);
  }
};


const unbanUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE users SET role = 'Użytkownik' WHERE id = ?", [id]);
    res.json({ message: "Ban zdjęty" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  updateUserRole,
  deleteUser,
  banUser,
  unbanUser,
  getStats,
  getOpinions,
  deleteOpinion,
  getRatings,
  deleteRating,
};

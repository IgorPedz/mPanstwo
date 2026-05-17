const db = require("../db");
const { getIO } = require("../socket/socket");

async function addXP(userId, amount, reason = "unknown") {
  console.log("➕ XP:", amount, reason);

  if (!userId || !amount) return null;

  // 1. UPDATE USERS
  await db.query(
    `UPDATE users SET xp = xp + ? WHERE id = ?`,
    [amount, userId]
  );

  // 2. GET UPDATED USER
  const [rows] = await db.query(
    `SELECT xp FROM users WHERE id = ?`,
    [userId]
  );

  if (!rows.length) {
    console.log("❌ USER NOT FOUND");
    return null;
  }

  const user = rows[0];

  // 3. LOG XP
  await db.query(
    `INSERT INTO xp_logs (user_id, amount, reason) VALUES (?, ?, ?)`,
    [userId, amount, reason]
  );

  // 4. SOCKET
  const io = getIO();

  if (io) {
    io.to(`user:${userId}`).emit("xp_gained", {
      amount,
      total: user.xp,
      reason
    });
  }

  return user.xp;
}

module.exports = { addXP };
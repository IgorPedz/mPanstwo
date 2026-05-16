const db = require("../db");

async function addXP(userId, amount, reason = "event") {
  await db.query(
    `UPDATE users SET xp = xp + ? WHERE id = ?`,
    [amount, userId]
  );

  const [[user]] = await db.query(
    `SELECT xp FROM users WHERE id = ?`,
    [userId]
  );

  const io = require("../socket/socket").getIO();

  io.to(`user:${userId}`).emit("xp_gained", {
    amount,
    total: user.xp,
    reason
  });

  return user.xp;
}

module.exports = { addXP };
const db = require("../db");
const { getIO } = require("../socket/socket");
const sendNotification = require("../utils/notification");

async function getRankByXP(xp) {
  const [[rank]] = await db.query(
    `
    SELECT *
    FROM ranks
    WHERE required_xp <= ?
    ORDER BY required_xp DESC
    LIMIT 1
    `,
    [xp],
  );

  return rank;
}

async function addXP(userId, amount, reason = "unknown") {

  if (!userId || typeof amount !== "number" || amount <= 0) {
    return null;
  }

  try {
    const [[oldUser]] = await db.query(
      `SELECT xp FROM users WHERE id = ?`,
      [userId],
    );

    if (!oldUser) {
      return null;
    }

    const oldXp = oldUser.xp;

    await db.query(
      `UPDATE users SET xp = xp + ? WHERE id = ?`,
      [amount, userId],
    );

    const [[newUser]] = await db.query(
      `SELECT xp FROM users WHERE id = ?`,
      [userId],
    );

    const newXp = newUser.xp;

    await db.query(
      `INSERT INTO xp_logs (user_id, amount, reason) VALUES (?, ?, ?)`,
      [userId, amount, reason],
    );

    const io = getIO();

    if (io) {
      io.to(`user:${userId}`).emit("xp_gained", {
        userId,
        amount,
        total: newXp,
        reason,
      });
    }
    const oldRank = await getRankByXP(oldXp);
    const newRank = await getRankByXP(newXp);

    if (!oldRank || oldRank.id !== newRank.id) {

      await sendNotification({
        type: "RANK_UP",
        userId,
        title: "Awans rangi",
        message: `Awansowałeś na rangę: ${newRank.name}`,
        data: {
          oldRank,
          newRank,
          xp: newXp,
        },
      });

      if (io) {
        io.to(`user:${userId}`).emit("rank_up", {
          oldRank,
          newRank,
        });
      }
    }

    return newXp;
  } catch (err) {
    console.error("❌ ADD XP ERROR:", err);
    return null;
  }
}

module.exports = { addXP };
const db = require("../db");

const updateUserActivity = async (userId) => {
  const conn = await db.getConnection();

  try {
    const [[user]] = await conn.query(
      `SELECT 
          login_streak,
          active_days,
          DATE_FORMAT(last_login_date, '%Y-%m-%d') AS last_login,
          DATE_FORMAT(last_streak_notified_date, '%Y-%m-%d') AS last_notified
       FROM users 
       WHERE id = ?`,
      [userId]
    );

    if (!user) return null;

    const [[dates]] = await conn.query(`
      SELECT 
        DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS today,
        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d') AS yesterday
    `);
    const { today, yesterday } = dates;

    let newStreak = user.login_streak || 0;
    
    let newActiveDays = user.active_days || 0; 

    if (user.last_login === today) {
      console.log("➡ SAME DAY LOGIN - NO CHANGE");

      return {
        streak: newStreak,
        activeDays: newActiveDays, 
        notify: false,
      };
    }

    newActiveDays += 1;

    if (user.last_login === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    const shouldNotify = user.last_notified !== today;

    await conn.query(
      `UPDATE users SET 
        login_streak = ?,
        active_days = ?,
        last_login_date = CURDATE(),
        last_streak_notified_date = ?
       WHERE id = ?`,
      [
        newStreak,
        newActiveDays,
        shouldNotify ? today : user.last_notified,
        userId,
      ]
    );
    
    return {
      streak: newStreak,
      activeDays: newActiveDays,
      notify: shouldNotify,
    };

  } catch (err) {
    console.error("STREAK ERROR:", err);
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = { updateUserActivity };
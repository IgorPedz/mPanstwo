const db = require("../db");

const updateUserActivity = async (userId) => {
  const conn = await db.getConnection();

  try {
    const [[user]] = await conn.query(
      `SELECT login_streak, active_days, last_login_date FROM users WHERE id = ?`,
      [userId]
    );

    if (!user) return null;

    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISODate = new Date(now - offset).toISOString().split("T")[0];
    
    const lastLoginDate = user.last_login_date 
      ? new Date(new Date(user.last_login_date) - offset).toISOString().split("T")[0] 
      : null;

    console.log(`Dziś: ${localISODate}, Ostatni raz: ${lastLoginDate}`);

    if (lastLoginDate === localISODate) {
      console.log("Logowanie w tym samym dniu - pomijam inkrementację.");
      return { streak: user.login_streak, activeDays: user.active_days };
    }

    let newStreak = user.login_streak || 0;
    let newActiveDays = (user.active_days || 0) + 1; 

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = new Date(yesterday - offset).toISOString().split("T")[0];

    if (lastLoginDate === yesterdayStr) {
      newStreak += 1;
    } 
    else {
      newStreak = 1;
    }

    await conn.query(
      `UPDATE users SET 
        login_streak = ?, 
        active_days = ?, 
        last_login_date = ? 
       WHERE id = ?`,
      [newStreak, newActiveDays, localISODate, userId]
    );

    return { streak: newStreak, activeDays: newActiveDays };

  } catch (err) {
    console.error("Błąd streak:", err);
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = {
  updateUserActivity,
};

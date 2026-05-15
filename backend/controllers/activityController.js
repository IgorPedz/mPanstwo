const db = require("../db");

const updateUserActivity = async (userId) => {
  const conn = await db.getConnection();

  try {
    console.log("\n=== STREAK START ===");
    console.log("USER ID:", userId);

    // 🔥 Wymuszamy format YYYY-MM-DD jako STRING za pomocą DATE_FORMAT
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

    console.log("DB USER:", user);

    // 🔥 Pobieramy dzisiejszą i wczorajszą datę również jako czysty tekst YYYY-MM-DD
    const [[dates]] = await conn.query(`
      SELECT 
        DATE_FORMAT(CURDATE(), '%Y-%m-%d') AS today,
        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), '%Y-%m-%d') AS yesterday
    `);
    const { today, yesterday } = dates;

    console.log("TODAY:", today);
    console.log("LAST LOGIN:", user.last_login);
    console.log("YESTERDAY:", yesterday);

    let newStreak = user.login_streak || 0;
    
    // BŁĄD LOGICZNY: Przeniosłem inkrementację active_days niżej, 
    // aby nie naliczało dnia wielokrotnie przy ponownym logowaniu tego samego dnia.
    let newActiveDays = user.active_days || 0; 

    // 🔥 SAME DAY → STOP (Porównanie stringów "YYYY-MM-DD" działa teraz poprawnie)
    if (user.last_login === today) {
      console.log("➡ SAME DAY LOGIN - NO CHANGE");

      return {
        streak: newStreak,
        activeDays: newActiveDays, // Zwraca aktualną liczbę dni bez dodawania kolejnego
        notify: false,
      };
    }

    // Jeśli użytkownik loguje się w nowy dzień, zwiększamy ogólny licznik aktywnych dni
    newActiveDays += 1;

    // 🔥 STREAK CONTINUE
    if (user.last_login === yesterday) {
      newStreak += 1;
      console.log("➡ STREAK CONTINUES:", newStreak);
    } else {
      newStreak = 1;
      console.log("➡ STREAK RESET:", newStreak);
    }

    // 🔥 NOTIFY ONLY ONCE PER DAY
    const shouldNotify = user.last_notified !== today;

    console.log("SHOULD NOTIFY:", shouldNotify);

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

    console.log("DB UPDATED");
    console.log("FINAL STREAK:", newStreak);
    console.log("NOTIFY:", shouldNotify);
    console.log("=== STREAK END ===\n");

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
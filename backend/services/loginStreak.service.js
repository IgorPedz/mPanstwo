const { updateUserActivity } = require("../controllers/activityController");

async function handleLoginStreak(userId) {
  const streakResult = await updateUserActivity(userId);

  if (!streakResult.notify) {
    return null;
  }

  return streakResult;
}

module.exports = { handleLoginStreak };
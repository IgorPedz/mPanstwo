const { updateUserActivity } = require("../controllers/activityController");
const { handleEvent } = require("../services/event.service");

const activityMiddleware = async (req, res, next) => {
  try {
    if (!req.user?.id) return next();

    const result = await updateUserActivity(req.user.id);

    if (!result) return next();

    if (result.notify) {
      if (result.streak >= 7) {
        await handleEvent(req.user.id, "LOGIN_STREAK_BIG", {
          streak: result.streak,
        });
      } else if (result.streak >= 3) {
        await handleEvent(req.user.id, "LOGIN_STREAK_SMALL", {
          streak: result.streak,
        });
      }
    }

    req.activity = result;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = activityMiddleware;
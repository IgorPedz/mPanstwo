const ALLOWED = ["Administrator", "Moderator"];

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Brak autoryzacji" });
  }
  if (!ALLOWED.includes(req.user.role)) {
    return res.status(403).json({ message: "Brak uprawnień moderatora" });
  }
  next();
};

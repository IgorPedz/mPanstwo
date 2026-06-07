module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Brak autoryzacji" });
  }
  if (req.user.role !== "Administrator") {
    return res.status(403).json({ message: "Brak uprawnień administratora" });
  }
  next();
};

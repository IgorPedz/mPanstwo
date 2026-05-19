const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("🔒 brak tokenu");
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("❌ invalid token");
    next();
  }
};
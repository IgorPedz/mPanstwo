const crypto = require("crypto");

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateToken = () => {
  return crypto.randomUUID();
};

module.exports = {
  generateVerificationCode,
  generateToken,
};
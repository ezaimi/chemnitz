const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
console.log("secret key = ", JWT_SECRET);

function generateToken(user, expiresInSeconds) {
  return jwt.sign(
    { email: user.email, roles: user.role },
    JWT_SECRET,
    { expiresIn: expiresInSeconds }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};

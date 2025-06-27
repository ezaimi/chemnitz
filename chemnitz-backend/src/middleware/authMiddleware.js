const { verifyToken } = require('../utils/jwtConfig');

function authenticateJWT(req, res, next) {
  console.log("here");

  const token = req.cookies['accessToken'];
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  req.user = {
    email: payload.email,
    roles: payload.roles,
  };

  next();
}

module.exports = { authenticateJWT };

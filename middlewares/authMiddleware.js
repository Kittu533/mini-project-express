const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Access token is required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({
          status: 403,
          message: 'Token has expired'
        });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({
          status: 403,
          message: 'Invalid token'
        });
      } else {
        return res.status(403).json({
          status: 403,
          message: 'Invalid or expired token'
        });
      }
    }

    req.user = decoded; // Menyimpan informasi user dari token ke req.user
    next();
  });
};

module.exports = { authenticateToken };
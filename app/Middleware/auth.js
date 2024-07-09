const jwt = require('jsonwebtoken');
const config = require('../config/database.config');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
}

function isAdmin(req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).send({ message: 'Only admin can access this resource.' });
  }
  next();
}

module.exports = {
  verifyToken,
  isAdmin
};

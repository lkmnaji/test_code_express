const jwt = require('jsonwebtoken');
const config = require('../config.js');
const db = require('../models');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(404).send({ auth: false, message: 'error', result: 'token tidak ditemukan' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'error', result : 'autentikasi token gagal' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send({ message: 'error', result: 'Hanya Admin yang bisa create event' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
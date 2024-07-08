const { Sequelize } = require('sequelize');
const config = require('../config/database.config');

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/userModel')(sequelize, Sequelize);
db.event = require('../models/eventModel')(sequelize, Sequelize);

module.exports = db;

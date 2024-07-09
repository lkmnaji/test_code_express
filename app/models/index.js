const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database.config');

const sequelize = new Sequelize(dbConfig.database.database, dbConfig.database.username, dbConfig.database.password, {
  host: dbConfig.database.host,
  dialect: dbConfig.database.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/userModel')(sequelize, Sequelize);
db.event = require('../models/eventModel')(sequelize, Sequelize);

module.exports = db;

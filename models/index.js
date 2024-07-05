const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.event = require('./event')(sequelize, Sequelize);
db.userEvent = require('./userEvent')(sequelize, Sequelize.DataTypes);
db.user.associate(db);
db.event.associate(db);

module.exports = db;

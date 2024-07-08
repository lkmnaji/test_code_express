module.exports = (sequelize, Sequelize) => {
    const UserEvent = sequelize.define('UserEvent', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return UserEvent;
  };
  
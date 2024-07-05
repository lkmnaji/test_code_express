module.exports = (sequelize, DataTypes) => {
    const UserEvent = sequelize.define('UserEvent', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return UserEvent;
  };
  
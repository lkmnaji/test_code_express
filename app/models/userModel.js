module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, undefined]
      }
    },
    events: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.ENUM('admin', 'guest'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    updatedBy: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
  });

  //   Users.associate = function(models) {
  //   Users.hasMany(models.UserEvent);
  // };

  return User;
};
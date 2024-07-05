module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, undefined]
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'guest'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.UserEvent);
  };

  return User;
};
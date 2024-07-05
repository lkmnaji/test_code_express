module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg : "Title must be unique"
      },
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: {
          args: true,
          msg: "format tanggal harus YYYY-MM-DD"
        }
      }
    }
  });

  Event.associate = function(models) {
    Event.hasMany(models.UserEvent);
  };

  return Event;
};


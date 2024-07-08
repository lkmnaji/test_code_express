module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('Event', {
    title: {
      type: Sequelize.STRING,
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
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    date: {
      type: Sequelize.STRING,
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

  // Event.associate = function(models) {
  //   Event.hasMany(models.UserEvent);
  // };

  return Event;
};


// models/user.js
module.exports = (sequelize, DataTypes) => {
  const Organizer = sequelize.define('Organizer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    startMembership: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endMembership: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    freezeTableName: true,
  });

  Organizer.associate = function(models) {
    Organizer.belongsTo(models.User, {
      foreignKey: 'usersId',
      as: 'User'
    });
  };

  return Organizer;
};

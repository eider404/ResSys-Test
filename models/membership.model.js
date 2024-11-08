// models/user.js
module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
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

  Membership.associate = function(models) {
    Membership.belongsTo(models.User, {
      foreignKey: 'usersId',
      as: 'User'
    });
  };

  return Membership;
};

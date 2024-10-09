'use strict';
module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[0, 1]]
      }
    },
    startMembership: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endMembership: {
      allowNull: false,
      type: DataTypes.DATE
    },
    
  }, {});

  Membership.associate = function(models) {
    Membership.belongsTo(models.Users, {
      foreignKey: 'usersId',
      as: 'Users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Membership;
};

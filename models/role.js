'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

  Role.associate = function(models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Role;
};

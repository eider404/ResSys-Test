'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nameService: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Organizer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    startSchedule: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endSchedule: {
      allowNull: false,
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[0, 1]]
      }
    }
  }, {});

  Service.associate = function(models) {
    Service.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'Category',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    Service.belongsTo(models.Users, {
      foreignKey: 'Organizer',
      as: 'Users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Service;
};

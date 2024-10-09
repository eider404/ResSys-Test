'use strict';
module.exports = (sequelize, DataTypes) => {
  const TableToReserve = sequelize.define('TableToReserve', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nameTable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Service',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    reserveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
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

  TableToReserve.associate = function(models) {
    TableToReserve.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'Service',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    TableToReserve.belongsTo(models.Reservation, {
      foreignKey: 'reserveId',
      as: 'Reservation',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return TableToReserve;
};

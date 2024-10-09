'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    userClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startReservation: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endReservation: {
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

  Reservation.associate = function(models) {
    Reservation.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'Service',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    Reservation.belongsTo(models.Users, {
      foreignKey: 'userClient',
      as: 'Users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Reservation;
};

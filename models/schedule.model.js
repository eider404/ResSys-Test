// models/user.js
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Service',
        key: 'id'
      }
    },
    reservationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reservation',
        key: 'id'
      }
    },
    startReservation: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endReservation: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    freezeTableName: true,
  });

  Schedule.associate = function(models) {
    
    Schedule.belongsTo(models.Reservation, {
      foreignKey: 'reservationId',
      as: 'Reservation'
    });

    Schedule.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'Service'
    });
  };

  return Schedule;
};

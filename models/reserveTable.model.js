// models/user.js
module.exports = (sequelize, DataTypes) => {
  const ReserveTable = sequelize.define('ReserveTable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    freezeTableName: true,
  });

  ReserveTable.associate = function(models) {
    
    ReserveTable.belongsTo(models.Reservation, {
      foreignKey: 'reservationId',
      as: 'Reservation'
    });

    ReserveTable.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'Service'
    });
  };

  return ReserveTable;
};

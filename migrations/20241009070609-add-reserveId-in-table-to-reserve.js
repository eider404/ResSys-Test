'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar el nuevo campo 'additionalInfo' a la tabla 'TableToReserve'
    await queryInterface.addColumn('TableToReserve', 'reserveId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Reservation', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar el campo 'additionalInfo' si es necesario revertir la migración
    await queryInterface.removeColumn('TableToReserve', 'reserveId');
  }
};

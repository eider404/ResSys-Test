'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Eliminar la columna 'reserveId' de la tabla 'TableToReserve'
    await queryInterface.removeColumn('TableToReserve', 'reserveId');
  },

  async down(queryInterface, Sequelize) {
    // Si es necesario, puedes volver a agregar la columna en el bloque down
    await queryInterface.addColumn('TableToReserve', 'reserveId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'TableToReserve', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};

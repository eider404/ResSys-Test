'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.changeColumn('TableToReserve', 'reserveId', {
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
    // Revertimos los cambios si es necesario, restaurando la referencia a 'TableToReserve'
    await queryInterface.changeColumn('TableToReserve', 'reserveId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'TableToReserve',  // Revertimos al modelo original 'TableToReserve'
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};

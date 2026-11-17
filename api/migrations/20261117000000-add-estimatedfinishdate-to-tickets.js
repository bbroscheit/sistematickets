'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tickets', 'estimatedfinishdate', {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('tickets', 'estimatedfinishdate');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existing = await queryInterface.rawSelect(
      'sectors',
      { where: { sectorname: 'Mesa de Ayuda' } },
      ['id']
    );
    if (existing) return;

    await queryInterface.bulkInsert('sectors', [{
      sectorname: 'Mesa de Ayuda',
      isdelete: false,
      salepointId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sectors', { sectorname: 'Mesa de Ayuda' });
  },
};

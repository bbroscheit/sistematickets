'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // agrega el rol "gerente general", arriba de "gerente" en la jerarquia
  // (empleado < encargado < jefe < gerente < gerente general). idempotente,
  // igual que la migracion que creo la tabla roles
  async up(queryInterface) {
    const existingId = await queryInterface.rawSelect(
      'roles',
      { where: { name: 'gerente general' } },
      ['id']
    );

    if (!existingId) {
      await queryInterface.bulkInsert('roles', [
        {
          name: 'gerente general',
          level: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', { name: 'gerente general' }).catch(() => {});
  },
};

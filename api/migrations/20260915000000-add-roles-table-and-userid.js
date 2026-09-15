'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // defensivo: si el server ya bootedo una vez con el modelo Role en el
    // código pero sin esta migración, sequelize.sync({force:false}) puede
    // haber creado la tabla "roles" solo (sin seed) por su cuenta - no
    // asumimos que no existe todavía.
    const tables = await queryInterface.showAllTables();
    const rolesTableExists = tables.map((t) => String(t).toLowerCase()).includes('roles');

    if (!rolesTableExists) {
      await queryInterface.createTable('roles', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        level: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    }

    const rolesSeed = [
      { name: 'empleado', level: 1 },
      { name: 'encargado', level: 2 },
      { name: 'jefe', level: 3 },
      { name: 'gerente', level: 4 },
    ];

    for (const role of rolesSeed) {
      const existingId = await queryInterface.rawSelect('roles', { where: { name: role.name } }, ['id']);
      if (!existingId) {
        await queryInterface.bulkInsert('roles', [
          { ...role, createdAt: new Date(), updatedAt: new Date() },
        ]);
      }
    }

    const usersTableDesc = await queryInterface.describeTable('users');
    if (!usersTableDesc.roleId) {
      await queryInterface.addColumn('users', 'roleId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'roleId').catch(() => {});
    await queryInterface.dropTable('roles').catch(() => {});
  },
};

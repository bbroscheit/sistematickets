'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // =========================
    // Tabla intermedia User ↔ Sector
    // =========================
    await queryInterface.createTable('UserSectors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      sector_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sectors',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // =========================
    // Tabla intermedia User ↔ Salepoint
    // =========================
    await queryInterface.createTable('UserSalepoints', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      salepoint_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'salepoints',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // =========================
    // Migrar datos existentes
    // =========================

    await queryInterface.sequelize.query(`
      INSERT INTO "UserSectors"(user_id, sector_id, "createdAt", "updatedAt")
      SELECT id, "sectorId", NOW(), NOW()
      FROM users
      WHERE "sectorId" IS NOT NULL;
    `);

    await queryInterface.sequelize.query(`
      INSERT INTO "UserSalepoints"(user_id, salepoint_id, "createdAt", "updatedAt")
      SELECT id, "salepointId", NOW(), NOW()
      FROM users
      WHERE "salepointId" IS NOT NULL;
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserSectors');
    await queryInterface.dropTable('UserSalepoints');
  }
};


const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const { sequelize, Role } = require('../src/bd'); // ajustá la ruta si hace falta

async function createRoles() {
  try {
    await sequelize.authenticate();

    await Role.bulkCreate(
      [
        { name: 'empleado', level: 0 },
        { name: 'encargado', level: 1 },
        { name: 'jefe', level: 2 },
        { name: 'gerente', level: 3 }
      ],
      {
        ignoreDuplicates: true
      }
    );

    console.log('✅ Roles creados correctamente');
  } catch (error) {
    console.error('❌ Error creando roles:', error);
  } finally {
    await sequelize.close();
  }
}

createRoles();
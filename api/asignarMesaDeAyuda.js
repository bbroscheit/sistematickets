// Script de un solo uso: asigna el sector "Mesa de Ayuda" a un usuario,
// para poder ver el menu "Usuarios" en el Navbar.
// Uso: node asignarMesaDeAyuda.js <username>

const { User, Sector } = require('./src/bd');

const username = process.argv[2];

if (!username) {
  console.log('Uso: node asignarMesaDeAyuda.js <username>');
  process.exit(1);
}

(async () => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log(`No se encontro un usuario con username "${username}"`);
      process.exit(1);
    }

    const sector = await Sector.findOne({ where: { sectorname: 'Mesa de Ayuda' } });
    if (!sector) {
      console.log('No existe el sector "Mesa de Ayuda" todavia - ¿corriste la migracion 20260909000000?');
      process.exit(1);
    }

    await user.addSector(sector);
    console.log(`Listo: "${username}" ahora pertenece al sector "Mesa de Ayuda" (id ${sector.id})`);
    process.exit(0);
  } catch (e) {
    console.log('Error:', e.message);
    process.exit(1);
  }
})();

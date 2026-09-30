// Script de SOLO LECTURA para diagnosticar sectores con el mismo nombre.
// Correr desde la carpeta api/: node diagnosticoSectores.js
const { Sector, Salepoint, User } = require('./src/bd');

(async () => {
  try {
    const sectors = await Sector.findAll({ include: [Salepoint] });

    const byName = {};
    sectors.forEach((s) => {
      byName[s.sectorname] = byName[s.sectorname] || [];
      byName[s.sectorname].push(s);
    });

    for (const [name, rows] of Object.entries(byName)) {
      if (rows.length <= 1) continue;
      console.log(`\n=== Sector "${name}" tiene ${rows.length} filas ===`);
      for (const row of rows) {
        const sucursal = row.Salepoint ? row.Salepoint.salepoint : '(sin sucursal asignada)';
        const cantidadUsuarios = await row.countUsers().catch(() => '?');
        console.log(`  id=${row.id}  sucursal=${sucursal}  usuarios_asignados=${cantidadUsuarios}`);
      }
    }

    console.log('\nListo.');
    process.exit(0);
  } catch (e) {
    console.log('Error:', e.message);
    process.exit(1);
  }
})();

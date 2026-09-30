// Unifica sectores duplicados (mismo nombre, distinta fila) que quedaron con usuarios
// reales de los dos lados - causado por el bug de client/pages/usuarios/[id].js que ya
// se corrigio (ver CHANGELOG). Elige como "canonico" la fila con MAS usuarios asignados
// y pasa a todos los usuarios de las otras filas del mismo nombre a esa fila canonica.
//
// No borra ninguna fila de Sector ni toca las que tienen 0 usuarios (esas quedan como
// estaban, no generan ningun problema).
//
// Uso:
//   node unificarSectoresDuplicados.js            -> dry run, no modifica nada
//   node unificarSectoresDuplicados.js --apply    -> aplica los cambios de verdad

const { Sector } = require('./src/bd');

const APLICAR = process.argv.includes('--apply');

(async () => {
  try {
    const sectors = await Sector.findAll();

    const byName = {};
    sectors.forEach((s) => {
      byName[s.sectorname] = byName[s.sectorname] || [];
      byName[s.sectorname].push(s);
    });

    let huboAlgoParaHacer = false;

    for (const [name, rows] of Object.entries(byName)) {
      if (rows.length <= 1) continue;

      const conConteo = await Promise.all(
        rows.map(async (row) => ({ row, count: await row.countUsers() }))
      );
      conConteo.sort((a, b) => b.count - a.count);

      const canonico = conConteo[0];
      const otras = conConteo.slice(1).filter((x) => x.count > 0);

      if (otras.length === 0) continue; // no hay split real, no tocar

      huboAlgoParaHacer = true;
      console.log(`\nSector "${name}": canonico id=${canonico.row.id} (${canonico.count} usuarios)`);

      for (const { row, count } of otras) {
        console.log(`  moviendo ${count} usuarios de id=${row.id} a id=${canonico.row.id}${APLICAR ? "" : "  (dry run)"}`);
        if (APLICAR) {
          const usuarios = await row.getUsers();
          for (const u of usuarios) {
            const yaTieneCanonico = await u.hasSector(canonico.row);
            if (!yaTieneCanonico) await u.addSector(canonico.row);
            await u.removeSector(row);
          }
        }
      }
    }

    if (!huboAlgoParaHacer) {
      console.log('No hay sectores duplicados con usuarios de los dos lados. Nada para hacer.');
    } else {
      console.log(APLICAR ? '\nListo, se aplicaron los cambios.' : '\n(dry run, no se modifico nada - correr con --apply para aplicar de verdad)');
    }
    process.exit(0);
  } catch (e) {
    console.log('Error:', e.message);
    process.exit(1);
  }
})();

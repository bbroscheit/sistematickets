const fs = require ( 'fs' );
const path = require ( 'path' );
const xlsx = require ( 'xlsx' );
const pkg = require ( 'pg' );
require ( 'dotenv/config' );

const { Pool } = pkg;

// conexión a la DB
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sistemasTicket",
  password: "87Cerberos!",
  port: 5432,
});


const EXCEL_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE,
  "Desktop",
  "roles.xlsx"
);

async function assignRoles() {
  console.log("Leyendo archivo Excel...");

  if (!fs.existsSync(EXCEL_PATH)) {
    throw new Error(`No se encontró el archivo: ${EXCEL_PATH}`);
  }

  const workbook = xlsx.readFile(EXCEL_PATH);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows = xlsx.utils.sheet_to_json(sheet);

  if (!rows.length) {
    throw new Error("El Excel está vacío");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const row of rows) {
      const { id: user_id, role } = row;

      if (!user_id || !role) {
        console.warn("Fila inválida, se salta:", row);
        continue;
      }

      // buscar role_id por name
      const roleResult = await client.query(
        `SELECT id FROM roles WHERE name = $1`,
        [role]
      );

      if (roleResult.rowCount === 0) {
        console.warn(`Rol no encontrado: ${role}`);
        continue;
      }

      const roleId = roleResult.rows[0].id;

      // asignar rol al usuario
      await client.query(
        `UPDATE users SET "roleId" = $1 WHERE id = $2`,
        [roleId, user_id]
      );

      console.log(`Usuario ${user_id} → rol ${role}`);
    }

    await client.query("COMMIT");
    console.log("Asignación de roles finalizada");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error, rollback ejecutado:", error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

assignRoles();

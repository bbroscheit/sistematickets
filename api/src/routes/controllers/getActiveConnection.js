require('dotenv').config();
const sql = require('mssql');

// se conecta directo a la base de Dynamics GP (el sistema de gestion) para
// ver que usuarios estan conectados ahi en este momento. las credenciales
// vienen de .env (antes estaban hardcodeadas aca mismo en texto plano)
const { GP_DB_USER, GP_DB_PASSWORD, GP_DB_SERVER, GP_DB_DATABASE } = process.env;

const config = {
    user: GP_DB_USER,
    password: GP_DB_PASSWORD,
    server: GP_DB_SERVER,
    database: GP_DB_DATABASE,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,

    },
};


const getActiveConnection = async () => {
    try {
        // conectamos
        await sql.connect(config);

        // Ejecutamos la consulta
        const result = await sql.query('SELECT USERID FROM ACTIVITY');
      
        return result.recordset;

    } catch (err) {
        
        console.error('Error al ejecutar la consulta:', err);
        return err
        // res.status(500).json({ error: 'Error interno del servidor' });
    } finally {

        // Cerramos
        await sql.close();
    }
}

module.exports = getActiveConnection;
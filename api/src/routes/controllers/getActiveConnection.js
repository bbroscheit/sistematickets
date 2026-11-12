const sql = require('mssql');

// se conecta directo a la base de Dynamics GP (el sistema de gestion) para
// ver que usuarios estan conectados ahi en este momento. las credenciales
// estan hardcodeadas aca mismo, ya que esta base es interna y no tiene que
// ver con la de soportes
const config = {
    user: 'sa',
    password: 'Barriletec0smic',
    server: 'SQL2-BA\\GP',
    database: 'DYNAMICS',
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
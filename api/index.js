require('dotenv').config();

// punto de entrada real del back. app.js es el server activo (http); el
// de abajo (appsHttps.js) quedo armado para cuando se tengan certificados
// pero nunca se termino de activar - ver appsHttps.js
const server = require('./src/app.js');
//const server = require('./src/appsHttps.js')
const { conn } = require ('./src/bd.js');
const { PORT } = process.env;

// force:false = nunca borra tablas, solo crea las que falten
conn.sync({force:false})
    .then(() => {
        server.listen( PORT, () => {
            console.log(`Listening on port ${PORT}, server connected`)
        })
    })
    .catch((err) => {
        console.log('Error al sincronizar la base de datos:', err.message)
    })


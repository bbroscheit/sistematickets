require('dotenv').config();

const server = require('./src/app.js');
//const server = require('./src/appsHttps.js')
const { conn } = require ('./src/bd.js');
const { PORT } = process.env;

conn.sync({force:false})
    .then(() => {
        server.listen( PORT, () => {
            console.log(`Listening on port ${PORT}, server connected`)
        })
    })
    .catch((err) => {
        console.log('Error al sincronizar la base de datos:', err.message)
    })


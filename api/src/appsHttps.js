//archivo generado para cuando tengamos certificados HTTPS

const express = require ('express');
const cookieParser = require('cookie-parser');
const bodyParser = require ('body-parser');
const morgan = require('morgan');
let cors = require('cors');
const cron = require('node-cron');
const https = require('https')
const fs = require('fs')
const path = require('path')

require('./bd.js')

let key = fs.readFileSync('./certificates/localhost-key.key');
let cert = fs.readFileSync('./certificates/localhost-cert.crt');
let options = {
  key: key, 
  cert: cert
};

// se cargan las rutas 
const sectorRouter = require ('../src/routes/sectorRouter.js')
const salepointRouter = require('../src/routes/salepointRouter.js')
const userRouter = require('../src/routes/userRouter.js')
const ticketRouter = require('../src/routes/ticketRouter.js')
const faqRouter = require('../src/routes/faqRouter.js')
const projectRouter = require('../src/routes/projectRouter.js')
const userstoriesRouter = require('../src/routes/userstoriesRouter.js')
const taskRouter = require('../src/routes/taskRouter.js')
const downloadRouter = require('../src/routes/downloadRouter.js');
const closeTicketByTime = require('./routes/helpers/closeTicketByTime.js');


// usamos cron para marcar cuando queremos que se ejecute la tarea programada
cron.schedule('0 12 * * *', () => {
        console.log('Ejecutando tarea programada todos los dias a las 7 de la mañana');
    // closeTicketByTime();
  });

const httpsServer = express();
httpsServer.name = 'API';

httpsServer.use(bodyParser.urlencoded({ extended:true, limit: '50mb'}));
httpsServer.use(bodyParser.json({limit: '50mb'}));
httpsServer.use(cookieParser());
httpsServer.use(morgan('dev'))
httpsServer.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Cache-Control', 'no-store');
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);

    if (req.method === 'OPTIONS') {
        console.log('Respondiendo a solicitud OPTIONS');
        res.sendStatus(200);
    } else {
        next();
    }
});

httpsServer.use(express.json());
httpsServer.use(cors());

// llamamos a los diferentes Routers

httpsServer.use('/' , sectorRouter);
httpsServer.use('/' , salepointRouter); 
httpsServer.use('/' , userRouter);
httpsServer.use('/' , ticketRouter);
httpsServer.use('/' , faqRouter);
httpsServer.use('/', projectRouter);
httpsServer.use('/', userstoriesRouter);
httpsServer.use('/', taskRouter);
httpsServer.use('/' , downloadRouter);

httpsServer.use((err,req,res) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status (status).send(message)
})

let server = https.createServer(options, httpsServer)


module.exports = server;
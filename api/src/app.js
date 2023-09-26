const express = require ('express');
const cookieParser = require('cookie-parser');
const bodyParser = require ('body-parser');
const morgan = require('morgan');
let cors = require('cors');
require('./bd.js')

// se cargan las rutas 
const sectorRouter = require ('../src/routes/sectorRouter.js')
const salepointRouter = require('../src/routes/salepointRouter.js')
const userRouter = require('../src/routes/userRouter.js')
const ticketRouter = require('../src/routes/ticketRouter.js')
const faqRouter = require('../src/routes/faqRouter.js')
const projectRouter = require('../src/routes/projectRouter.js')
const userstoriesRouter = require('../src/routes/userstoriesRouter.js')
const taskRouter = require('../src/routes/taskRouter.js')

const server = express();
server.name = 'API';

server.use(bodyParser.urlencoded({ extended:true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'))
server.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials','true');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type, Accept');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,DELETE');
    res.header('Cache-Control', 'no-store');
    next();
});

server.use(express.json());
server.use(cors());

// llamamos a los diferentes Routers
server.use('/' , sectorRouter);
server.use('/' , salepointRouter); 
server.use('/' , userRouter);
server.use('/' , ticketRouter);
server.use('/' , faqRouter);
server.use('/', projectRouter);
server.use('/', userstoriesRouter);
server.use('/', taskRouter);


server.use((err,req,res) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status (status).send(message)
})

module.exports = server;
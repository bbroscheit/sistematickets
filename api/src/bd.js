require('dotenv').config();

const { Sequelize, Op } = require ( 'sequelize');
const fs = require ( 'fs' );
const path = require ( 'path' );
const { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT} = process.env

const sequelize = new Sequelize(`postgres://${DB_HOST}:${DB_PASSWORD}@${DB_USER}:${DB_PORT}/sistemasTicket` , {
    logging : false,
    native: false,
    // timezone: '-03:00'
});

const basename = path.basename ( __filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners

fs.readdirSync( path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0 ) && ( file !== basename ) && (file.slice(-3) === '.js'))
    .forEach((file) => {modelDefiners.push(require(path.join(__dirname, '/models', file)))
    })

// Injectamos la conexion (sequelize) a todos los modelos

modelDefiners.forEach( model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: user => User

let entries = Object.entries(sequelize.models);
let capEntries = entries.map((entry) => [entry [0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capEntries);

// En sequelize.models están todos los modelos importados como propiedades para relacionarlos hacemos un destructuring

const { Sector, Ticket, User, Salepoint, Faq, Project, Userstories, Task, Priority, Newtask, Newproject, Schedule  } = sequelize.models;

// Relacionamos las tablas
// seccion de Soportes

User.belongsTo(Sector);
Sector.hasMany(User);

User.hasMany(Ticket);
Ticket.belongsTo(User);

User.belongsTo(Salepoint);
Salepoint.hasMany(User);

Sector.belongsTo(Salepoint);
Salepoint.hasMany(Sector);

// Ticket.belongsTo(Priority);
// Priority.hasMany(Ticket);

// seccion de proyectos

Project.hasMany(Userstories);
Userstories.belongsTo(Project);

Userstories.hasMany(Task);
Task.belongsTo(Userstories, {
    foreignKey: 'userstoryId', // Nombre de la clave externa en la tabla Task
    as: 'userstory' // Nombre de la relación en singular
});

Newproject.hasMany(Newtask);
Newtask.belongsTo(Newproject);

User.belongsToMany(Newtask , { through: 'user_newtask'})
Newtask.belongsToMany(User , { through: 'user_newtask'})

User.belongsToMany(Task , { through: 'user_task'})
Task.belongsToMany(User , { through: 'user_task'})

User.belongsToMany(Project , { through: 'user_project'})
Project.belongsToMany(User , { through: 'user_project'})

User.belongsToMany(Newproject , { through: 'user_newproject'})
Newproject.belongsToMany(User , { through: 'user_newproject'})



// Autenticamos y conectamos

sequelize.authenticate()
    .then(() => console.log('Database Connected'))
    .catch( err => console.log(err))

// exportamos los modelos y la conexion de Sequelize

module.exports = {
    ...sequelize.models,
    sequelize,
    conn: sequelize,
    Op
}

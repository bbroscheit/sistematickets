require('dotenv').config();

const { Sequelize, Op } = require ( 'sequelize');
const fs = require ( 'fs' );
const path = require ( 'path' );
const { DB_HOST, DB_PASSWORD, DB_USER, DB_PORT} = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/sistemasTicket` , {
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

const { Sector, 
        Ticket, 
        User, 
        Salepoint, 
        Faq, 
        Project, 
        Userstories, 
        Task, 
        Priority, 
        Newtask, 
        Newproject, 
        Schedule, 
        Proveedor, 
        Proveedornote , 
        Workernote, 
        Suscription, 
        Capacitation, 
        Platform,
        Formproject,
        Desarrollo,
        Role,
        TicketEvent,
        TicketEventRecipient } = sequelize.models;

// Relacionamos las tablas
// seccion de Soportes

User.belongsToMany(Sector, {
  through: 'UserSectors',
  foreignKey: 'user_id',
  otherKey: 'sector_id',
  as: 'sectors'
});

Sector.belongsToMany(User, {
  through: 'UserSectors',
  foreignKey: 'sector_id',
  otherKey: 'user_id',
  as: 'users'
});

User.belongsTo(Role, { as: 'role' });
Role.hasMany(User , { as : 'users'});

User.hasMany(Ticket);
Ticket.belongsTo(User);

User.belongsToMany(Salepoint, {
  through: 'UserSalepoints',
  foreignKey: 'user_id',
  otherKey: 'salepoint_id',
    as: 'salepoints'
});

Salepoint.belongsToMany(User, {
  through: 'UserSalepoints',
  foreignKey: 'salepoint_id',
  otherKey: 'user_id',
    as: 'users'
});

Sector.belongsTo(Salepoint);
Salepoint.hasMany(Sector);

Ticket.hasOne(Proveedornote);
Proveedornote.belongsTo(Ticket);

Proveedor.hasMany(Proveedornote);
Proveedornote.belongsTo(Proveedor);

Ticket.hasOne(Workernote);
Workernote.belongsTo(Ticket);

//creamos las relaciones para TicketEvent y TicketEventRecipient
Ticket.hasMany(TicketEvent, {
  foreignKey: "ticketId",
  as: "events",
});

TicketEvent.belongsTo(Ticket, {
  foreignKey: "ticketId",
  as: "ticket",
});

TicketEventRecipient.belongsTo(TicketEvent, {
  foreignKey: "ticketEventId",
  as: "ticketEvent",
});

TicketEvent.hasMany(TicketEventRecipient, {
  foreignKey: "ticketEventId",
  as: "recipients",
});

User.hasMany(TicketEvent, {
  foreignKey: "actorUserId",
  as: "generatedEvents",
});

TicketEvent.belongsTo(User, {
  foreignKey: "actorUserId",
  as: "actor",
});




// Relación User - Capacitation
User.hasMany(Capacitation, { foreignKey: 'teacher_id', as: 'teacherCapacitaciones' });
Capacitation.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });

// Relación Desarrollos - Users m:M
Desarrollo.belongsToMany(User, {
    through: 'user_desarrollo',
    as: 'users',
    foreignKey: 'desarrollo_id',
    otherKey: 'user_id'
});
User.belongsToMany(Desarrollo, {
    through: 'user_desarrollo',
    as: 'desarrollos',
    foreignKey: 'user_id',
    otherKey: 'desarrollo_id'
});

// Relación Desarrollos - Tickets M:1
Desarrollo.hasMany(Ticket, { foreignKey: 'desarrollo_id', as: 'tickets' });
Ticket.belongsTo(Desarrollo, { foreignKey: 'desarrollo_id', as: 'desarrollo' });


// Relación muchos a muchos entre User y Capacitation para students
User.belongsToMany(Capacitation, {
    through: 'students',
    as: 'enrolledCapacitations',
    foreignKey: 'user_id',
    otherKey: 'capacitations_id'
});
Capacitation.belongsToMany(User, {
    through: 'students',
    as: 'student',
    foreignKey: 'capacitation_id',
    otherKey: 'users_id'
});

Capacitation.hasOne(Platform);
Platform.belongsTo(Capacitation);

// Relación muchos a muchos entre User y plataformas para master
User.belongsToMany(Platform, {
    through: 'masters',
    as: 'knowledgePlatforms',
    foreignKey: 'user_id',
    otherKey: 'platforms_id'
});
Platform.belongsToMany(User, {
    through: 'masters',
    as: 'masterPlatforms',
    foreignKey: 'platforms_id',
    otherKey: 'users_id'
});



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

Newproject.hasOne(Formproject);
Formproject.belongsTo(Newproject);

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

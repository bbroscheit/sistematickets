const { DataTypes } = require('sequelize')

// ojo, esto no es lo que usa el ticket (Ticket.priority es un string suelto,
// "Media" por defecto, no tiene relacion con esta tabla). esta tabla
// "priority" parece que quedo sin terminar de conectar - el controller
// getPriority.js tiene el return comentado, revisar si hace falta o se puede
// sacar
module.exports = (sequelize) => {
    sequelize.define('priority', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull:false
        },
        state:{
            type: DataTypes.STRING,
            defaultValue:'baja',
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }

    })
}
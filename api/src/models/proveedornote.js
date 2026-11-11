const { DataTypes } = require ('sequelize');

// esto es la "nota" que se crea cuando un ticket se deriva a un proveedor
// externo. mientras esta con state "Comenzado" el ticket pasa a estado
// "Terceros"; al cerrarla (state "Terminado") el ticket vuelve a "Desarrollo"
module.exports = ( sequelize ) => {
    sequelize.define( "proveedornote" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            defaultValue: " descripcion sin ingresar ",
            allowNull:false
        },
        state:{
            // "Comenzado" mientras el proveedor lo esta resolviendo, "Terminado"
            // cuando se cierra
            type: DataTypes.STRING,
            defaultValue: " Sin estado ",
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    })
}
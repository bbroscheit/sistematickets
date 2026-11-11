const { DataTypes } = require ('sequelize')

// un "desarrollo" es un pedido de desarrollo interno, distinto de un ticket/
// soporte normal. lo arma sistemas para seguir sus propias tareas
module.exports = (sequelize) => {
    sequelize.define ('desarrollo', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            defaultValue:"Falta nombre",
            allowNull:false
        },
        state:{
            type: DataTypes.INTEGER,
            defaultValue: 1, // 0 inactivo, 1 activo, 2 completado
            allowNull: false
        },
        isdelete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
    })
}
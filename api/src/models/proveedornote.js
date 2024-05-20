const { DataTypes } = require ('sequelize');

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
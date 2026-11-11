const { DataTypes } = require ('sequelize');

// catalogo de proveedores externos (los que se contratan cuando un soporte
// no lo resuelve el equipo interno). un ticket se linkea a un proveedor a
// traves de proveedornote.js, no directo
module.exports = ( sequelize ) => {
    sequelize.define( "proveedor" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            defaultValue: " nombre de proveedor sin definir ",
            allowNull:false
        },
        description:{
            type: DataTypes.STRING,
            defaultValue: " descripcion sin ingresar ",
            allowNull:false
        },
        address:{
            type: DataTypes.STRING,
            defaultValue: " direccion sin definir ",
            allowNull:false
        },
        zone:{
            type: DataTypes.STRING,
            defaultValue: " zona sin definir ",
            allowNull:false
        },

        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    })
}
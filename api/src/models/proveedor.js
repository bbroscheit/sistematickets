const { DataTypes } = require ('sequelize');

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
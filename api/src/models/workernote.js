const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( 'workernote' , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        lastuser:{
            type: DataTypes.STRING,
            defaultValue: " usuario sin ingresar ",
            allowNull:false
        },
        newuser:{
            type: DataTypes.STRING,
            defaultValue: " usuario sin ingresar ",
            allowNull:false
        },
        description:{
            type: DataTypes.STRING(5000),
            defaultValue: " descripcion sin ingresar ",
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    })
}
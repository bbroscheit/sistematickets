const { DataTypes } = require ('sequelize');

// registro de cuando se reasigna un ticket de un developer a otro
module.exports = ( sequelize ) => {
    sequelize.define( 'workernote' , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        lastuser:{
            // quien lo tenia asignado antes
            type: DataTypes.STRING,
            defaultValue: " usuario sin ingresar ",
            allowNull:false
        },
        newuser:{
            // a quien se lo reasignaron
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
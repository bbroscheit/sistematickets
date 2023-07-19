const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( "user" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        password:{
            type: DataTypes.STRING,
            defaultValue: " password sin ingresar ",
            allowNull:false
        },
        firstname:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        lastname:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        phonenumber:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        isworker:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    })
}
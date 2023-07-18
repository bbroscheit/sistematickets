const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( "ticket", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        state:{
            type: DataTypes.STRING,
            defaultValue: "generada",
            allowNull:false,
        },
        worker:{
            type: DataTypes.STRING,
            defaultValue: "sin asignar",
            allowNull:false,
        },
        subject:{
            type: DataTypes.STRING,
            defaultValue: "sin asunto",
            allowNull:false,
        },
        detail:{
            type: DataTypes.STRING,
            defaultValue: "sin detalle",
            allowNull:false,
        },
        state:{
            type: DataTypes.STRING,
            defaultValue: "Generada",
            allowNull:false,
        },
        created:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull:false,
        },
        startdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull:false,
        },
        finishdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull:false,
        },
        randomdate:{
            type: DataTypes.DATE,
            defaulValue: DataTypes.NOW,
            allowNull:false,
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaulValue: false,
            allowNull:false,
        }

    } )
}
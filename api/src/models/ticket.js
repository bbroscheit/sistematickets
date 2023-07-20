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
        created:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        startdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        finishdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        
        randomdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,

        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    } )
}
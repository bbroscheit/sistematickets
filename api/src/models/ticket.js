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
            type: DataTypes.STRING(5000),
            length: 1000,
            defaultValue: "sin detalle",
            allowNull:false,
        },
        answer:{
            type: DataTypes.STRING(5000),
            
        },
        files:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        userresolved:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            
        },
        startdate:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            
        },
        finishdate:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            
        },
        
        randomdate:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,

        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    } )
}
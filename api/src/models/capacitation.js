const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( "capacitation", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        state:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Generado"
        },
        subject:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        startdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        finishdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}
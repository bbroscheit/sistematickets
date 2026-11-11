const { DataTypes } = require ('sequelize');

// plataforma por la que se da una capacitacion (zoom, meet, etc), se linkea
// con capacitation.js
module.exports = ( sequelize ) => {
    sequelize.define( "platform", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        detail:{
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}
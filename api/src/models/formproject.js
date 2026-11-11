const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( "formproject", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        
        files:{
            // archivos adjuntos del proyecto. ojo: si editas el proyecto y subis
            // archivos nuevos esto se PISA entero, no se van sumando - pendiente
            // de arreglar
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
    } )
}
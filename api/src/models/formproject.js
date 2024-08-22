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
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
    } )
}
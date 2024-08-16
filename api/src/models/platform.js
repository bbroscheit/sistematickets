const { DataTypes } = require ('sequelize');

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
const { DataTypes } = require ('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('desarrollo', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            defaultValue:"Falta nombre",
            allowNull:false
        },
        state:{
            type: DataTypes.INTEGER,
            defaultValue: 1, // 0: Inactive, 1: Active, 2: Completed
            allowNull: false
        },
        isdelete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
    })
}
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('priority', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull:false
        },
        state:{
            type: DataTypes.STRING,
            defaultValue:'baja',
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }

    })
}
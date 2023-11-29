const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('userstories',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        state:{
            type: DataTypes.STRING,
            defaultValue:'generado',
            allowNull:false,
        },
        storiesname:{
            type: DataTypes.STRING(5000),
            defaultValue:'sin nombre',
            allowNull:false,
        },
        storiesdetail:{
            type: DataTypes.STRING(5000),
            defaultValue:"sin detalle",
            allowNull:false
        },
        priority:{
            type: DataTypes.STRING,
            defaultValue:"urgente",
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue:false,
           
        },
    })
}
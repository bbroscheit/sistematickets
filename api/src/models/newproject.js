const { DataTypes } = require ('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('newproject', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        state:{
            type: DataTypes.STRING,
            defaultVale:"iniciado",
            allowNull:false
        },
        projectname:{
            type: DataTypes.STRING(5000),
            defaultValue:"sin nombrar",
            allowNull:false
        },
        projectdetail:{
            type: DataTypes.STRING(5000),
            defaultValue:"sin detalle",
            allowNull:false
        },
        finishdate:{
            type:DataTypes.STRING,
            defaultValue:"12-12-2022",
            allowNull:false
        },
        isdelete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
    })
}
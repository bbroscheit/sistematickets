const { DataTypes } = require ('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('project', {
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
            type:DataTypes.STRING,
            defaultValue:"sin nombrar",
            allowNull:false
        },
        projectdetail:{
            type:DataTypes.STRING,
            defaultValue:"sin detalle",
            allowNull:false
        },
        isdelete:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
    })
}
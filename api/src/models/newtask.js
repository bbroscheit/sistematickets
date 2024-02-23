const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('newtask', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull:false
        },
        state:{
            type: DataTypes.STRING,
            defaultValue:'generado',
            allowNull:false
        },
        taskdetail:{
            type: DataTypes.STRING,
            defaultValue:'sin detalle',
            allowNull: false
        },
        taskdate:{
            type: DataTypes.STRING,
            allowNull:false
        },
        taskfinishdate:{
            type: DataTypes.STRING,
            allowNull:false
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }

    })
}
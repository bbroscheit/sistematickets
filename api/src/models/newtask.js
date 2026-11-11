const { DataTypes } = require('sequelize')

// tareas de un proyecto nuevo (Proyectos V2). "task.js" es la version vieja,
// queda solo para lo que ya existia de antes
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
            type: DataTypes.STRING(5000),
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
const { DataTypes } = require('sequelize')

// version vieja de las tareas, de antes de Proyectos V2. ver newtask.js para
// lo que se usa ahora
module.exports = (sequelize) => {
    sequelize.define('task', {
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
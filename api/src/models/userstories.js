const { DataTypes } = require('sequelize')

// parte del modulo viejo de proyectos (project.js/task.js), historias de
// usuario al estilo agile. no tiene relacion con Proyectos V2 (newproject.js)
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
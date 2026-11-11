const { DataTypes } = require ('sequelize')

// este es el modelo de Proyectos que se usa ahora (el modulo V2). el viejo
// "project.js" quedo de la version anterior, ya no se usa para nada nuevo
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
            defaultValue:"iniciado",
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
            // el default "12-12-2022" no significa nada, es solo un placeholder
            // viejo - siempre se pisa con la fecha real al crear el proyecto
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
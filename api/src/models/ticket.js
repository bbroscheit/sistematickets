const { DataTypes } = require ('sequelize');

// el soporte/ticket. "state" es un string libre, no un enum, los valores
// reales que se usan son: "sin asignar", "Asignado", "Desarrollo",
// "Terceros", "Informacion", "Completado", "Terminado" (y "generada" que es
// el default antes de que se le ponga un estado real). si se agrega un
// estado nuevo hay que acordarse de sumarlo en todos los lugares que
// desglosan por estado (tablero, tarjetas de info, pills) - ver CHANGELOG
module.exports = ( sequelize ) => {
    sequelize.define( "ticket", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        state:{
            type: DataTypes.STRING,
            defaultValue: "generada",
            allowNull:false,
        },
        worker:{
            // username del developer asignado, como string plano (no FK a
            // User). "sin asignar" cuando todavia no tiene a nadie
            type: DataTypes.STRING,
            defaultValue: "sin asignar",
            allowNull:false,
        },
        subject:{
            type: DataTypes.STRING,
            defaultValue: "sin asunto",
            allowNull:false,
        },
        detail:{
            type: DataTypes.STRING(5000),
            length: 1000,
            defaultValue: "sin detalle",
            allowNull:false,
        },
        answer:{
            type: DataTypes.STRING(5000),
            defaultValue: "sin detalle",
        },
        priority:{
            // esto NO tiene relacion con el modelo priority.js, es un campo
            // suelto. el modelo priority.js parece una tabla que quedo sin
            // terminar de usar
            type: DataTypes.STRING,
            defaultValue: "Media",
        },
        files:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        userresolved:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        startdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        finishdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        
        randomdate:{
            // el nombre no dice nada pero esto es la fecha de "Asignado" que se
            // muestra en el excel y en las pantallas - se llama asi porque en
            // algun momento se seteaba con una fecha random, ya no es asi pero
            // el nombre quedo
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,

        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    } )
}
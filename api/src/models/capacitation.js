const { DataTypes } = require ('sequelize');

// esto es para las capacitaciones que se le dan a los usuarios (clases,
// charlas de un sistema puntual). tiene profesor, alumnos y una plataforma
// (zoom, meet, etc) via las relaciones en bd.js
module.exports = ( sequelize ) => {
    sequelize.define( "capacitation", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        state:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Generado"
        },
        subject:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        startdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        finishdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}
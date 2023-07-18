const { DataTypes } = require ('sequelize');

module.exports = ( sequelize ) => {
    sequelize.define( "sector" , {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        sectorname: {
            type: DataTypes.STRING,
            defaultValue: " Nombre sin definir ",
            allowNull: false,
        },
        isdelete:{
            type: DataTypes.BOOLEAN,

        }

    } 

    )
}


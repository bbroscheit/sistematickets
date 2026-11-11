const { DataTypes } = require ('sequelize');

// esto es la sucursal (el nombre quedo en ingles pero es "punto de venta" /
// sucursal). un usuario puede tener varias, es many-to-many con User
module.exports = ( sequelize ) => {
    sequelize.define( "salepoint" , {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        salepoint: {
            type: DataTypes.STRING,
            defaultValue: " Nombre sin definir ",
            allowNull: false,
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    } 

    )
}

const { DataTypes } = require ('sequelize');

// sector/departamento (Administracion, Sistemas, Cobranzas, etc). un usuario
// puede tener varios (many-to-many con User). ojo: en produccion hay sectores
// duplicados con el mismo nombre (filas viejas repetidas) - ver CHANGELOG del
// 2026-09-30 y el script unificarSectoresDuplicados.js en api/. tambien hay
// una relacion a Salepoint (Sector.belongsTo) pero en la practica casi nunca
// esta cargada, el sector y la sucursal de un usuario se manejan por separado
// (cada uno su propia tabla many-to-many con User)
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
            // esto es lo que usa la pantalla de Gestion de Sectores para
            // activar/desactivar (true = inactivo, se puede reactivar). no es
            // un borrado de verdad, el nombre quedo del patron isdelete viejo
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    }

    )
}


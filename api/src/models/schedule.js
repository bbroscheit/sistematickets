const { DataTypes } = require ('sequelize');

// esto es la agenda/almanaque (reuniones, eventos). invited/accepted son
// arrays de usernames, no relaciones de verdad
module.exports = ( sequelize ) => {
    sequelize.define( "schedule" , {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        detail: {
            type: DataTypes.STRING,
            defaultValue: " Motivo sin definir ",
            allowNull: false,
        },
        invited:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        accepted:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        startdate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        starthour:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        
        finishhour:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    } 

    )
}

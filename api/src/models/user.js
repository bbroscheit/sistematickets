const { DataTypes } = require ('sequelize');

// los defaults de username/password/firstname/lastname/email/phonenumber
// son todos el mismo texto generico copiado y pegado, no tiene mucho
// sentido pero en la practica no molesta porque son allowNull:false y
// siempre se cargan de verdad al crear el usuario
module.exports = ( sequelize ) => {
    sequelize.define( "user" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        password:{
            type: DataTypes.STRING,
            defaultValue: " password sin ingresar ",
            allowNull:false
        },
        firstname:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        lastname:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        phonenumber:{
            type: DataTypes.STRING,
            defaultValue: " nombre de usuario sin definir ",
            allowNull:false
        },
        isworker:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isprojectmanager:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isprojectworker:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        managerId:{
            // referencia al jefe directo (otro user). se agrego pensando en
            // mostrar/filtrar soportes por jerarquia de managers, pero al final
            // no se uso para eso: la visibilidad de soportes se decidio por
            // rol + sector + sucursal (ver getTicketUnfinishedByUser.js y
            // getManagersForUser.js). no hay ninguna pantalla donde se pueda
            // cargar esto todavia, queda como null siempre
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },

    })
}
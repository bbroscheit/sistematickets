const { DataTypes } =require( 'sequelize' );

module.exports = ( sequelize ) => {
    sequelize.define ( "faq" , {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING(5000),
            allowNull: false
        },
        answer:{
            type: DataTypes.STRING(5000),
            allowNull: false
        },
        uresolved:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        questioner:{
            // lista de usernames que preguntaron esto mismo (si alguien pregunta
            // algo que ya existe como faq, se le agrega el username aca en vez de
            // crear una faq nueva)
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }) 
}
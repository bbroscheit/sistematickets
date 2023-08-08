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
            type: DataTypes.STRING,
            allowNull: false
        },
        answer:{
            type: DataTypes.STRING,
            allowNull: false
        },
        uresolved:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        questioner:{
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        isdelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }) 
}
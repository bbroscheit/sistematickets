const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Suscription', {
      suscription: {
        type: DataTypes.JSON,
        allowNull: false,
      }
    });
  
    
  };
  
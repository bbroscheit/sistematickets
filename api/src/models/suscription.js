const { DataTypes } = require ('sequelize');

// guarda las suscripciones a notificaciones push del navegador (lo que
// devuelve el browser al pedir permiso de notificaciones), para poder
// mandarle avisos despues
module.exports = (sequelize) => {
    sequelize.define('Suscription', {
      suscription: {
        type: DataTypes.JSON,
        allowNull: false,
      }
    });


  };

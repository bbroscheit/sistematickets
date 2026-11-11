    const { DataTypes } = require("sequelize");

// cada fila es un evento que le paso a un ticket (cambio de estado, info
// agregada, comentario, reapertura). sirve para armar las notificaciones
// (ver ticketEventRecipient.js, que es quien tiene que ver cada evento)
module.exports = (sequelize) => {
  sequelize.define("ticketEvent", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    eventType: {
      // algunos valores que puede tener: "STATE_CHANGED", "INFO_ADDED",
      // "COMMENT_ADDED", "REOPENED"
      type: DataTypes.STRING,
      allowNull: false,
    },

    actorUserId: {
      // el usuario que genero el evento
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
    tableName: "ticketEvents",
  });
};

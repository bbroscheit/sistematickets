const { DataTypes } = require("sequelize");

// vincula un evento (ticketEvent.js) con cada usuario que lo tiene que ver -
// asi se sabe a quien le llega la notificacion y quien ya la leyo
module.exports = (sequelize) => {
  sequelize.define("ticketEventRecipient", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    ticketEventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    readAt: {
      // null = todavia no lo leyo, con fecha = ya lo leyo
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: true,
    tableName: "ticketEventRecipients",
  });
};
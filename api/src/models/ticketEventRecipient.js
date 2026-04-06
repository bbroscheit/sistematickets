const { DataTypes } = require("sequelize");

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
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      // null => no leído
      // date => leído
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
    const { DataTypes } = require("sequelize");

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
      type: DataTypes.STRING,
      allowNull: false,
      // ejemplos:
      // "STATE_CHANGED"
      // "INFO_ADDED"
      // "COMMENT_ADDED"
      // "REOPENED"
    },

    actorUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // quién generó el evento
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

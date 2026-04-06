const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
  sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
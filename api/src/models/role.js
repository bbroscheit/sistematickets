const { DataTypes } = require ('sequelize');

// jerarquia de roles: empleado(1) < encargado(2) < jefe(3) < gerente(4).
// "level" es ese orden, se usa para saber quien esta "arriba" de quien
// (ver getManagersForUser.js y getTicketUnfinishedByUser.js)
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
const { Ticket, User } = require("../../bd");
const { Sequelize } = require('sequelize');

const getTicketByUsuarioId = async (usuarioId) => {
  try {
    let getTIcketByName = await Ticket.findAll({
      include: {
        model: User,
        
        where: { username: usuarioId },
      },
      where: {
        state: {
          [Sequelize.Op.not]: "Terminado",
        },
      },
    });

    getTIcketByName
      ? getTIcketByName.sort((a, b) => {
          return a.id - b.id;
        })
      : (getTIcketByName = 0);

    return getTIcketByName;
  } catch (e) {
    console.log("error en controller getTicketByUsuarioId", e.message);
  }
};

module.exports = getTicketByUsuarioId;

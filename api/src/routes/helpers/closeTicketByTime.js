const { Ticket } = require("../../bd");

const closeTicketByTime = async () => {
  try {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const setTicket = await Ticket.update(
      { state: "Terminado" },
      {
        where: {
          state: "Completado",
          updatedAt: { [Op.lt]: tenDaysAgo },
        },
      }
    );

    return setTicket;
  } catch (error) {
    console.error("Error al cerrar tickets por tiempo:", error.message);
    throw error;
  }
};

module.exports = closeTicketByTime;

// const { Ticket } = require("../../bd");
// const { Op } = require("sequelize");

// const closeTicketByTime = async () => {
//   try {
//     const tenDaysAgo = new Date();
//     tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

//     const setTicket = await Ticket.update(
//       { state: "Terminado" },
//       {
//         where: {
//           state: "Completado",
//           updatedAt: { [Op.lt]: tenDaysAgo },
//         },
//       }
//     );

//     return setTicket;
//   } catch (error) {
//     console.error("Error al cerrar tickets por tiempo:", error.message);
//     throw error;
//   }
// };

// module.exports = closeTicketByTime;

const { Ticket } = require("../../bd");

const closeTicketByTime = async () => {
  try {
    
    const currentDate = new Date();

    const tickets = await Ticket.findAll({
      where: {
        state: "Completado",
      },
    });

    for (const ticket of tickets) {
      // Calculamos la fecha hace 10 días a partir de la fecha de finalización del ticket
      const finishDatePlusTenDays = new Date(ticket.finishdate);
      finishDatePlusTenDays.setDate(finishDatePlusTenDays.getDate() + 10);

      // Verificamos si la fecha actual es mayor a finishdate + 10 días
      if (currentDate > finishDatePlusTenDays) {
        // Actualizamos el estado del ticket a "Terminado"
        await Ticket.update(
          { state: "Terminado" },
          {
            where: {
              id: ticket.id,
            },
          }
        );
      }
    }

    return "Tickets actualizados correctamente";
  } catch (error) {
    console.error("Error al cerrar tickets por tiempo:", error.message);
    throw error;
  }
};

module.exports = closeTicketByTime;

const { Ticket, sequelize } = require('../../bd')

// el developer acepta el ticket que le asignaron: pasa a "Desarrollo",
// arranca el startdate (el "comienzo" que se ve en el excel) y guarda la
// fecha aproximada de terminacion que cargo en el modal (estimatedfinishdate)
const assigmentAcepted = async (id, estimatedfinishdate) => {
    let setTicket = await Ticket.update(
        { state: "Desarrollo", startdate: sequelize.literal('CURRENT_TIMESTAMP'), estimatedfinishdate },
        { where: { id:id } }
      );

    return setTicket

}

module.exports= assigmentAcepted
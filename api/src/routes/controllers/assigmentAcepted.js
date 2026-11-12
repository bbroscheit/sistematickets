const { Ticket, sequelize } = require('../../bd')

// el developer acepta el ticket que le asignaron: pasa a "Desarrollo" y
// arranca el startdate (el "comienzo" que se ve en el excel)
const assigmentAcepted = async (id) => {
    let setTicket = await Ticket.update(
        { state: "Desarrollo", startdate: sequelize.literal('CURRENT_TIMESTAMP')},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= assigmentAcepted
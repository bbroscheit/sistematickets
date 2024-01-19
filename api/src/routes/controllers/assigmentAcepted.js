const { Ticket, sequelize } = require('../../bd')

const assigmentAcepted = async (id) => {
    let setTicket = await Ticket.update(
        { state: "Desarrollo", startdate: sequelize.literal('CURRENT_TIMESTAMP')},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= assigmentAcepted
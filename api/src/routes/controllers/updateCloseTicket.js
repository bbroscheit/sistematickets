const { Ticket } = require('../../bd')

const updateCloseTicket = async (id) => {
    let setTicket = await Ticket.update(
        { state: "Terminado"},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateCloseTicket
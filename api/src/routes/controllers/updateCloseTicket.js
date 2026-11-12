const { Ticket } = require('../../bd')

// el usuario cierra el ticket definitivamente: pasa a "Terminado"
const updateCloseTicket = async (id) => {
    let setTicket = await Ticket.update(
        { state: "Terminado"},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateCloseTicket
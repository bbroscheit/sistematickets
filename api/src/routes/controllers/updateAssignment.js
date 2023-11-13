const { Ticket } = require('../../bd')

const updateAssignment = async (id, name) => {
    let setTicket = await Ticket.update(
        { worker: name , state: "Desarrollo"},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateAssignment
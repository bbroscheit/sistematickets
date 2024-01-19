const { Ticket, sequelize } = require('../../bd')


const updateAssignment = async (id, name) => {
    let setTicket = await Ticket.update(
        { worker: name , state: "Asignado",created: sequelize.literal('CURRENT_TIMESTAMP') },
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateAssignment
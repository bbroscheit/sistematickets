const { Ticket } = require('../../bd')


const updateAssignment = async (id, newPriority) => {
    try {
        let setTicket = await Ticket.update(
            { priority : newPriority},
            { where: { id:id } } 
          );
        return setTicket

    } catch (error) {
        console.log(error)
    }
   
    
}

module.exports= updateAssignment
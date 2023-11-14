const { Ticket } = require('../../bd')

const updateSolutionTicket = async (id, solution) => {
    let setTicket = await Ticket.update(
        { answer: solution , state: "Completado"},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateSolutionTicket
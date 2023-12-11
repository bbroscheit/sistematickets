const { Ticket } = require('../../bd')

const updateSolutionTicket = async (id, solution) => {
    const date = new Date()

    let setTicket = await Ticket.update(
        { answer: solution , state: "Completado" , finishdate: date},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateSolutionTicket
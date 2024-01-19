const { Ticket, sequelize } = require('../../bd')

const updateSolutionTicket = async (id, solution) => {
    const date = new Date()

    let setTicket = await Ticket.update(
        { answer: solution , state: "Completado" , finishdate: sequelize.literal('CURRENT_TIMESTAMP')},
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateSolutionTicket
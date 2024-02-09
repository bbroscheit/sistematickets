const { Ticket } = require('../../bd');

const getTicketsBySubject = async (subject2) => {
    try {
        const latestTicket = await Ticket.findOne({
            where: { subject: subject2 },
            order: [['createdAt', 'DESC']], // Ordenar por fecha de creación en orden descendente
        });
        
        return latestTicket;
    }catch(e){
        console.log( "error en controller getTicketsBySubject" , e.message)
    }
}

module.exports = getTicketsBySubject
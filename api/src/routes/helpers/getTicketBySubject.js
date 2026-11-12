const { Ticket, User } = require('../../bd');

// busca el ticket mas reciente que tenga ese titulo exacto. se usa en algun
// flujo viejo donde no se tiene el id del ticket a mano, solo el subject
const getTicketsBySubject = async (subject2) => {
    try {
        const latestTicket = await Ticket.findOne({
            where: { subject: subject2 },
            include:[{
                model: User,
            }],
            order: [['createdAt', 'DESC']], // Ordenar por fecha de creación en orden descendente
        });
        
        return latestTicket;
    }catch(e){
        console.log( "error en controller getTicketsBySubject" , e.message)
    }
}

module.exports = getTicketsBySubject
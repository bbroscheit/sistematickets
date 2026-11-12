const { Ticket, User } = require('../../bd');

// dado el id de un ticket, devuelve el mail del usuario que lo creo
const getUserEmailByTicketID = async (idTicket) => {
    try {
        const ticketData  = await Ticket.findOne({
            where:{id: idTicket}, 
            include:[{
                model:User,
                attribute:["email"]
            }]
        });
        
        const userEmail = ticketData ? ticketData.user.email : null;

        return userEmail;
    }catch(e){
        console.log( "error en controller getTicketsBySubject" , e.message)
    }
}

module.exports = getUserEmailByTicketID
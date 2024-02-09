const { Ticket, User } = require('../../bd');

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
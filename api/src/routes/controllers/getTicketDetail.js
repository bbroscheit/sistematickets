const { Ticket, User } = require('../../bd');

const getTicketDetail = async (id) => {
    
    try {
        let ticketDetail = await Ticket.findOne({
            where:{id: id}, 
            include:[{
                model:User,
                attribute:["username"]
            }]
        });
        return ticketDetail;
    } catch (e) {
        console.log("Error en controllers/getTicketdetail.js" , e.message)
    }
}



module.exports = getTicketDetail;
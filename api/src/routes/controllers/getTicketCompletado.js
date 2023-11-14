const { Ticket, User } = require('../../bd');

const getTicketCompletado = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "Completado"},
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return a.id - b.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketCompletado" , e.message)
    }
}

module.exports = getTicketCompletado
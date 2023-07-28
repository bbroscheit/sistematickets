const { Ticket, User } = require('../../bd');

const getTicketTerminado = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "terminado"},
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return a.id - b.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketTerminado" , e.message)
    }
}

module.exports = getTicketTerminado
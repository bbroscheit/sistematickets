const { Ticket, User } = require('../../bd');

// todos los tickets en estado "sin asignar" (los que todavia nadie tomo)
const getTicketsGenerados = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "sin asignar"},
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return a.id - b.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketsGenerados " , e.message)
    }
}

module.exports = getTicketsGenerados 
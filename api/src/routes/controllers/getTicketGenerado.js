const { Ticket, User } = require('../../bd');

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
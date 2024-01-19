const { Ticket, User } = require('../../bd');

const getTicketsAsignados = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "Asignado"},
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return a.id - b.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketsAsignados " , e.message)
    }
}

module.exports = getTicketsAsignados 
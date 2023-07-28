const { Ticket, User } = require('../../bd');

const getTicketsDesarrollo = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "desarrollo"},
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return a.id - b.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketsDesarrollo" , e.message)
    }
}

module.exports = getTicketsDesarrollo
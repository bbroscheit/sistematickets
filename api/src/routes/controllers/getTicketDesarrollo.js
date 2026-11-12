const { Ticket, User } = require('../../bd');

// todos los tickets en estado "Desarrollo" (no incluye "Terceros", que es
// un estado separado aunque tambien esta "en desarrollo" en la practica)
const getTicketsDesarrollo = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "Desarrollo"},
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
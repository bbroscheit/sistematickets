const { Ticket, User } = require('../../bd');

// a pesar del nombre, esto trae los tickets en estado "Informacion", no
// "Desarrollo" - quedo con este nombre por como se fue armando el router
const getTicketsDesarrollo2 = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "Informacion"},
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return a.id - b.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketsDesarrollo2" , e.message)
    }
}

module.exports = getTicketsDesarrollo2
const { Ticket, User } = require('../../bd');

// a pesar del nombre (y de vivir al lado de los controllers de faq), esto
// no tiene nada que ver con faq: trae los TICKETS en estado "Terminado",
// del mas nuevo al mas viejo. lo usa la ruta /faqFinish
const getAllFaqFinish = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "Terminado" },
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"],
                
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return b.id - a.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getAllFaqFinish" , e.message)
    }
}

module.exports = getAllFaqFinish
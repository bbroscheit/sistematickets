const { Ticket, User } = require('../../bd');

const getAllFaqFinish = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "Terminado" },
            
        });

        getTickets ? getTickets.sort((a , b) => { return b.id - a.id }) : getTickets = 0
        

        return getTickets;
    }catch(e){
        console.log( "error en controller getAllFaqFinish" , e.message)
    }
}

module.exports = getAllFaqFinish
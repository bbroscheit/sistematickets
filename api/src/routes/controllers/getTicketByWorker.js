const { Ticket, User } = require('../../bd');

const getTicketByWorker = async (workerName) => {
    
    try{

        let getTIcketByName = await Ticket.findAll({
            where: { worker: workerName},
        });

        getTIcketByName ? getTIcketByName.sort((a , b) => { return a.id - b.id }) : getTIcketByName = 0
        
        
        return getTIcketByName;
    }catch(e){
        console.log( "error en controller getTicketByWorker" , e.message)
    }
}

module.exports = getTicketByWorker
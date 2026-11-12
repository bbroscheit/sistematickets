const { Ticket, User } = require('../../bd');

// lo mismo que getTicketByWorker.js pero recibe el id del developer en
// vez del username, y lo resuelve primero
const getTicketByWorkerId = async (id) => {
    
    try{

        let worker = await User.findOne({ where: { id: id } });
        
        // si el worker existe busco los tickets asociados , si no existe devuelvo un error


        let getTIcketByName = await Ticket.findAll({
            where: { worker: worker.username},
            include:{
                model: User
            }           
        });

        getTIcketByName ? getTIcketByName.sort((a , b) => { return a.id - b.id }) : getTIcketByName = 0
        
        
        return getTIcketByName;
    }catch(e){
        console.log( "error en controller getTicketByWorkerId" , e.message)
    }
}

module.exports = getTicketByWorkerId
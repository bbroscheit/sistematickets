const { User } = require('../../bd');

// igual que getUserByName.js pero recibe el ticket entero y busca por
// ticket.worker (el username del developer asignado)
const getWorkerByName = async (ticket) => {
    
    try{
        let getUser = await User.findAll({
            where: { username: ticket.worker},
        });
        
        return getUser;
    }catch(e){
        console.log( "error en helper getWorkerByName " , e.message)
    }
}

module.exports = getWorkerByName 


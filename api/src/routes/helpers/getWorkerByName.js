const { User } = require('../../bd');

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


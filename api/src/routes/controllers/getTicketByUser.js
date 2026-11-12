const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

// tickets no terminados de un usuario puntual, buscado por username
const getTicketByUser = async (username) => {
    
    try{

        let getTIcketByName = await Ticket.findAll({
            require: true,
            include:{
                model:User,
                where: { username: username},
            },
            where: {
                state: {
                    [Sequelize.Op.not]: "Terminado"
                }
            },
        });

        
        return getTIcketByName;
    }catch(e){
        console.log( "error en controller getTicketByUser" , e.message)
    }
}

module.exports = getTicketByUser
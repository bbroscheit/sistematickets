const { Ticket, User } = require('../../bd');

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
const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketDeveloperCard = async (workerName) => {
    try{
        let getTickets = await Ticket.findAll({
            where: [{ worker : workerName},
                {
                state: {
                    [Sequelize.Op.not]: ["Terminado", "sin asignar"] // Filtrar por estado diferente a "terminado"
                }
            }],
            include:[{
                model:User,
                where: {
                    isdelete: {
                        [Sequelize.Op.not]: true // Filtrar usuarios que no están eliminados
                    }
                },
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets.sort((a , b) => { return a.state - b.state })

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketDeveloperCard" , e.message)
    }
}

module.exports = getTicketDeveloperCard;
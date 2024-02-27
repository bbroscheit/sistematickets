const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

const getAllTicketUnfinished = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: {
                state: {
                    [Sequelize.Op.not]: "Terminado" // Filtrar por estado diferente a "terminado"
                }
            },
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets.sort((a , b) => { return a.id - b.id })

        return getTickets;
    }catch(e){
        console.log( "error en controller getAllTicketUnfinished" , e.message)
    }
}

module.exports = getAllTicketUnfinished;
const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

// todos los tickets no terminados, para la vista general de supervisor
const getTicketSupervisorView = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: {
                state: {
                    [Sequelize.Op.not]: ["Terminado"] // Filtrar por estado diferente a "terminado"
                }
            },
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        // "createAt" no existe (es "createdAt"), esto no ordena nada
        getTickets.sort((a , b) => { return a.createAt - b.createAt })

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketSupervisorView" , e.message)
    }
}

module.exports = getTicketSupervisorView;
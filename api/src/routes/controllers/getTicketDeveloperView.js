const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketDeveloperView = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: {
                state: {
                    [Sequelize.Op.not]: ["Terminado", "sin asignar"] // Filtrar por estado diferente a "terminado"
                }
            },
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets.sort((a , b) => { return a.createAt - b.createAt })

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketDeveloperView" , e.message)
    }
}

module.exports = getTicketDeveloperView;
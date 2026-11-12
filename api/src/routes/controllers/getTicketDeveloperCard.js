const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

// tickets activos (ni terminados ni sin asignar) de un developer puntual,
// para su tarjeta en la vista de developer
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

        // esto no ordena nada en realidad: state es texto, restar dos
        // strings da NaN siempre
        getTickets.sort((a , b) => { return a.state - b.state })

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketDeveloperCard" , e.message)
    }
}

module.exports = getTicketDeveloperCard;
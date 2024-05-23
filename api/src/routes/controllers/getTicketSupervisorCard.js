const { Ticket, User, Sector } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketSupervisorCard = async (supervisorSector) => {
    
    let sector = ""

    switch (supervisorSector) {
        case "Jefatura de Facturacion":
                sector = "Facturacion"
            break;
        case "Jefatura de Contabilidad":
                sector = "Contabilidad"
            break;
        case "Jefatura de Cobranzas":
                sector = "Cobranzas"
            break;
        case "Jefatura de Tesoreria":
                sector = "Tesoreria"
            break;
        case "Jefatura de Emprendimientos":
                sector = "Emprendimientos"
            break;
        case "Jefatura de Compras":
                sector = "Compras"
            break;
        default:
            break;
    }

    try{
        
        let getTickets = await Ticket.findAll({
            include: [{
                model: User,
                required: true, 
                include: [{
                    model: Sector,
                    where: { sectorname: sector }
                }]
            }],
            where: {
                state: {
                    [Sequelize.Op.not]: "Terminado"
                }
            },
            order: [['state', 'ASC']]
        });

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketSupervisorCard" , e.message)
    }
}

module.exports = getTicketSupervisorCard;
const { Ticket, User, Sector } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketSupervisorCard = async (supervisorSector) => {
    
    let sector = ''

    switch (supervisorSector) {
        case "Jefatura de Contabilidad":
            sector = "Contabilidad"
            break;
        case "Jefatura de Cobranzas":
            sector = "Cobranzas"
            break;
        case "Jefatura de Compras":
            sector = "Compras"
            break;
        case "Jefatura de Facturacion":
            sector = "Facturacion"
            break;
        case "Jefatura de Tesoreria":
            sector = "Tesoreria"
            break;
        case "Jefatura de Logistica":
            sector = "Logistica"
            break;
        case "Jefatura de Sistemas":
            sector = "Sistemas"
            break;
    }

    console.log("sector en controller", sector)

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

        console.log("getTickets en controller", getTickets) 
        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketSupervisorCard" , e.message)
    }
}

module.exports = getTicketSupervisorCard;
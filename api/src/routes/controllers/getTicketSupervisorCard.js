const { Ticket, User, Sector } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketSupervisorCard = async (supervisorSector) => {
    console.log(supervisorSector)
    let sector = ""

    switch (supervisorSector) {
        case "Jefatura de facturacion":
                sector = "Facturacion"
            break;
        case "Jefatura de contabilidad":
                sector = "Contabilidad"
            break;
        case "Jefatura de cobranzas":
                sector = "Cobranzas"
            break;
        case "Jefatura de tesoreria":
                sector = "Tesoreria"
            break;
        case "Jefatura de emprendimientos":
                sector = "Emprendimientos"
            break;
        case "Jefatura de compras":
                sector = "Compras"
            break;
        default:
            break;
    }

    try{
        // let getTickets = await Ticket.findAll({
        //     include:[{
        //         model:User,
        //         include:[{ 
        //                 model: Sector,
        //                 where:{ sectorname : sector}
        //             }]
        //     }],
        //     where:{
        //         state:{
        //             [Sequelize.Op.not]: "Terminado"
        //         }
        //     },
        //     order:[['state', 'ASC']]
        // });

        console.log("sector", sector)
        console.log("soportes", getTickets)
        // return getTickets;
    }catch(e){
        console.log( "error en controller getTicketSupervisorCard" , e.message)
    }
}

module.exports = getTicketSupervisorCard;
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

    sector = sector.trim();
    // creamos un array con los nombres de los desarrolladores hasta encontrar el problema con la BD y el sector Sistemas
    const desarrolladores = ["Lllamanzarez", "Vlodigiani", "Llamanzarez","Asuarez","Masencio","Fduhalde","Cobranzasprueba1"]
    //console.log("sector en controller", sector)

    const sectores = await Sector.findAll();
    sectores.forEach(s => {
        //console.log(`Sector: '${s.sectorname}'`);
    });

    try{
        
        let getTickets 
        if (sector === "Sistemas") {
            //console.log("Buscando tickets para desarrolladores:", desarrolladores);
            getTickets = await Ticket.findAll({
                include: [{
                    model: User,
                    
                    required: true,
                    where: {
                        username: desarrolladores,
                        isdelete: {
                            [Sequelize.Op.not]: true // Filtrar usuarios que no están eliminados
                        }
                    }
                }]
            });
        } else {
            getTickets = await Ticket.findAll({
                include: [{
                    model: User,
                    where: {
                    isdelete: {
                        [Sequelize.Op.not]: true // Filtrar usuarios que no están eliminados
                    }
                },
                    required: true,
                    include: [{
                        model: Sector,
                        where: { sectorname: sector }
                    }]
                }]
            });
        }

        //console.log("getTickets en controller", getTickets) 
        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketSupervisorCard" , e.message)
    }
}

module.exports = getTicketSupervisorCard;
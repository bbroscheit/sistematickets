const { Ticket, User, Sector } = require('../../bd');
const { Sequelize } = require('sequelize');

// tickets de un sector puntual, para la tarjeta del jefe/supervisor de
// ese sector. recibe el nombre del ROL ("Jefatura de Cobranzas") y lo
// traduce al nombre del SECTOR ("Cobranzas")
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
    // lista de developers hardcodeada a mano como parche mientras estaba
    // el lio de los sectores duplicados (ver sector.js) - para el sector
    // "Sistemas" no se confia en la relacion sector/usuario, se filtra
    // directo por estos usernames
    const desarrolladores = ["Lllamanzarez", "Vlodigiani", "Llamanzarez","Asuarez","Masencio","Fduhalde","Cobranzasprueba1"]
    //console.log("sector en controller", sector)

    // esto no hace nada (el forEach esta vacio, era para debuggear a mano
    // en algun momento), lo dejo porque no afecta pero no tiene uso real
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
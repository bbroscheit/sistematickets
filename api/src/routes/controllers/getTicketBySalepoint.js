const { Ticket, User, Sector, Salepoint } = require('../../bd');

// trae los tickets de una sucursal puntual.
// ojo: el include de Sector y Salepoint no tiene "as", pero hoy esas
// relaciones son many-to-many con alias ('sectors'/'salepoints' en
// user.js) - probablemente esto tira error al ejecutarse en vez de
// filtrar bien. no lo toco porque arreglarlo bien implica revisar que
// sucursal usar cuando un usuario tiene mas de un sector/sucursal
// cargado (mismo tema que se resolvio para el excel de tickets)
const getTicketBySalepoint = async (salepoint) => {
    
    try {
        let getTicketsBySalepoint = await Ticket.findAll({
            include: {
                model: User,
                include: {
                    model: Sector,
                    include: {
                        model: Salepoint,
                        where: { salepoint: salepoint },
                        attributes: []
                    },
                    attributes: ["name"] // Ajusta según los atributos que necesites del modelo Sector
                },
                attributes: ["username"] // Ajusta según los atributos que necesites del modelo User
            }
        });
        getTicketsBySalepoint ? getTicketsBySalepoint.sort((a, b) => a.id - b.id) : getTicketsBySalepoint = 0;

        return getTicketsBySalepoint;
    } catch (e) {
        console.log("error en controller getTicketBySalepoint", e.message);
    }
}

module.exports = getTicketBySalepoint;
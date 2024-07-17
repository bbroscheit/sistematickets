const { Ticket, User, Sector, Salepoint } = require('../../bd');

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
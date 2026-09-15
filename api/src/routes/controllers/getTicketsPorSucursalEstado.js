const { Ticket, User, Sector, Salepoint } = require('../../bd');

const SIN_SUCURSAL = "Sin sucursal";

function resolveSalepoint(ticket) {
    const sectors = ticket.user ? ticket.user.sectors : [];
    if (!sectors || sectors.length === 0) return SIN_SUCURSAL;
    const sector = sectors[0];
    return sector.salepoint ? sector.salepoint.salepoint : SIN_SUCURSAL;
}

const getTicketsPorSucursalEstado = async (salepoint, state) => {
    try {
        const tickets = await Ticket.findAll({
            attributes: ['id', 'state', 'subject', 'worker', 'createdAt', 'updatedAt'],
            include: [{
                model: User,
                attributes: ['firstname', 'lastname'],
                include: [{
                    model: Sector,
                    as: 'sectors',
                    attributes: ['id', 'sectorname'],
                    include: [{ model: Salepoint, attributes: ['id', 'salepoint'] }],
                    through: { attributes: [] }
                }]
            }],
            order: [['id', 'DESC']],
        });

        return tickets
            .map(ticket => ({
                id: ticket.id,
                subject: ticket.subject,
                state: ticket.state,
                worker: ticket.worker,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt,
                creador: ticket.user ? `${ticket.user.firstname} ${ticket.user.lastname}` : "",
                salepoint: resolveSalepoint(ticket),
            }))
            .filter(t => (!salepoint || t.salepoint === salepoint) && (!state || t.state === state));
    } catch (e) {
        console.log("error en controller getTicketsPorSucursalEstado", e.message);
    }
};

module.exports = getTicketsPorSucursalEstado;

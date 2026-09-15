const { Ticket, User, Sector, Salepoint } = require('../../bd');

const ESTADOS = ["sin asignar", "Asignado", "Desarrollo", "Informacion", "Completado", "Terminado"];
const SIN_SUCURSAL = "Sin sucursal";

// resuelve la sucursal "hogar" de un ticket a partir del primer sector de su creador
function resolveSalepoint(ticket) {
    const sectors = ticket.user ? ticket.user.sectors : [];
    if (!sectors || sectors.length === 0) return SIN_SUCURSAL;
    const sector = sectors[0];
    return sector.salepoint ? sector.salepoint.salepoint : SIN_SUCURSAL;
}

const getSoportesPorSucursal = async () => {
    try {
        const tickets = await Ticket.findAll({
            attributes: ['id', 'state'],
            include: [{
                model: User,
                attributes: ['id'],
                include: [{
                    model: Sector,
                    as: 'sectors',
                    attributes: ['id', 'sectorname'],
                    include: [{ model: Salepoint, attributes: ['id', 'salepoint'] }],
                    through: { attributes: [] }
                }]
            }]
        });

        const bySalepoint = new Map();
        const totales = { total: 0 };
        ESTADOS.forEach(e => { totales[e] = 0; });

        tickets.forEach(ticket => {
            const salepoint = resolveSalepoint(ticket);
            if (!bySalepoint.has(salepoint)) {
                const counts = { total: 0 };
                ESTADOS.forEach(e => { counts[e] = 0; });
                bySalepoint.set(salepoint, counts);
            }
            const counts = bySalepoint.get(salepoint);
            counts.total++;
            totales.total++;
            if (ESTADOS.includes(ticket.state)) {
                counts[ticket.state]++;
                totales[ticket.state]++;
            }
        });

        const sucursales = Array.from(bySalepoint.entries()).map(([salepoint, counts]) => ({
            salepoint,
            counts,
        }));
        sucursales.sort((a, b) => a.salepoint === SIN_SUCURSAL ? 1 : b.salepoint === SIN_SUCURSAL ? -1 : a.salepoint.localeCompare(b.salepoint));

        return { estados: ESTADOS, sucursales, totales };
    } catch (e) {
        console.log("error en controller getSoportesPorSucursal", e.message);
    }
};

module.exports = getSoportesPorSucursal;

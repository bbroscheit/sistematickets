const { User, Role, Sector, Salepoint } = require('../../bd');
const { Op } = require('sequelize');

const HIERARCHY = ['empleado', 'encargado', 'jefe', 'gerente'];

// dado el usuario que creo/completo el ticket, busca a quien avisarle por mail:
// el primer nivel superior (mismo sector + sucursal) que tenga al menos un
// usuario, subiendo la cadena hasta gerente si hace falta (por ejemplo si
// todavia no hay un encargado asignado en ese sector+sucursal)
const getManagersForUser = async (ticketUser) => {
    try {
        if (!ticketUser) return [];

        const fullUser = await User.findByPk(ticketUser.id, {
            include: [
                { model: Role, as: 'role' },
                { model: Sector, as: 'sectors', through: { attributes: [] } },
                { model: Salepoint, as: 'salepoints', through: { attributes: [] } },
            ],
        });

        if (!fullUser) return [];

        const roleName = fullUser.role ? fullUser.role.name : 'empleado';
        const startIndex = HIERARCHY.indexOf(roleName);
        const levelsAbove = startIndex >= 0 ? HIERARCHY.slice(startIndex + 1) : HIERARCHY.slice(1);

        const sectorIds = fullUser.sectors.map((s) => s.id);
        const salepointIds = fullUser.salepoints.map((sp) => sp.id);

        for (const level of levelsAbove) {
            const isGerente = level === 'gerente';

            const candidates = await User.findAll({
                include: [
                    { model: Role, as: 'role', where: { name: level }, required: true },
                    ...(isGerente
                        ? []
                        : [
                            { model: Sector, as: 'sectors', through: { attributes: [] }, where: { id: { [Op.in]: sectorIds } }, required: true },
                            { model: Salepoint, as: 'salepoints', through: { attributes: [] }, where: { id: { [Op.in]: salepointIds } }, required: true },
                        ]),
                ],
                distinct: true,
            });

            const emails = [...new Set(candidates.map((c) => c.email).filter(Boolean))];
            if (emails.length > 0) return emails;
        }

        return [];
    } catch (e) {
        console.log('Error en helper getManagersForUser', e.message);
        return [];
    }
};

module.exports = getManagersForUser;

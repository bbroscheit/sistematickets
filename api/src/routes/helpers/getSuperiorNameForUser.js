const { User, Role, Sector, Salepoint } = require('../../bd');
const { Op } = require('sequelize');

const HIERARCHY = ['empleado', 'encargado', 'jefe', 'gerente'];

// mismo criterio de jerarquia que getManagersForUser.js (sube de nivel en
// nivel, respetando sector+sucursal, hasta encontrar a alguien), pero
// devuelve nombre y apellido en vez de email - para la columna "Superior"
// del excel de soportes. Si hay mas de un candidato en el mismo nivel
// (ej. dos encargados del mismo sector+sucursal) se devuelven todos
// separados por coma
const SIN_SUPERIOR = 'Sin superior';

const getSuperiorNameForUser = async (userId) => {
    try {
        if (!userId) return SIN_SUPERIOR;

        const fullUser = await User.findByPk(userId, {
            include: [
                { model: Role, as: 'role' },
                { model: Sector, as: 'sectors', through: { attributes: [] } },
                { model: Salepoint, as: 'salepoints', through: { attributes: [] } },
            ],
        });

        if (!fullUser) return SIN_SUPERIOR;

        const roleName = fullUser.role ? fullUser.role.name : 'empleado';
        const startIndex = HIERARCHY.indexOf(roleName);
        const levelsAbove = startIndex >= 0 ? HIERARCHY.slice(startIndex + 1) : HIERARCHY.slice(1);

        const sectorIds = fullUser.sectors.map((s) => s.id);
        const salepointIds = fullUser.salepoints.map((sp) => sp.id);

        for (const level of levelsAbove) {
            const candidates = await User.findAll({
                include: [
                    { model: Role, as: 'role', where: { name: level }, required: true },
                    { model: Sector, as: 'sectors', through: { attributes: [] }, where: { id: { [Op.in]: sectorIds } }, required: true },
                    { model: Salepoint, as: 'salepoints', through: { attributes: [] }, where: { id: { [Op.in]: salepointIds } }, required: true },
                ],
                distinct: true,
            });

            if (candidates.length > 0) {
                return candidates.map((c) => `${c.firstname} ${c.lastname}`).join(', ');
            }
        }

        return SIN_SUPERIOR;
    } catch (e) {
        console.log('Error en helper getSuperiorNameForUser', e.message);
        return SIN_SUPERIOR;
    }
};

module.exports = getSuperiorNameForUser;

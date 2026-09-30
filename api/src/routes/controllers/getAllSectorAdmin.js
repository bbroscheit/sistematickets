const { Sector, User } = require('../../bd');

// a diferencia de getAllSector.js (que solo trae los activos, para los
// desplegables normales), este trae TODOS los sectores (activos e inactivos)
// mas la cantidad de usuarios reales asignados a cada uno - para la pantalla
// de Gestion de Sectores
const getAllSectorAdmin = async () => {
    try {
        let allSector = await Sector.findAll({
            include: {
                model: User,
                as: 'users',
                attributes: ['id'],
                where: { isdelete: false },
                required: false,
                through: { attributes: [] },
            },
        });

        allSector.sort((a, b) => {
            if (a.sectorname < b.sectorname) return -1;
            if (a.sectorname > b.sectorname) return 1;
            return 0;
        });

        return allSector.map((s) => ({
            id: s.id,
            sectorname: s.sectorname,
            isdelete: s.isdelete,
            userCount: s.users.length,
        }));
    } catch (e) {
        console.log("error en controller getAllSectorAdmin", e.message)
    }
};

module.exports = getAllSectorAdmin;

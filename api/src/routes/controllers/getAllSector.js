const { Sector, Salepoint } = require('../../bd');

// trae los sectores activos, ordenados alfabeticamente - para los
// desplegables normales (no confundir con getAllSectorAdmin.js)
const getAllSector = async() => {
    try{
        let allSector = await Sector.findAll({
            where: { isdelete: false},
            include:{
                model: Salepoint,
                attribute:["salepoint"]
            }
        })

        allSector.sort((a, b) => {
            // Ordenar por el nombre del sector de forma ascendente
            if (a.sectorname < b.sectorname) return -1;
            if (a.sectorname > b.sectorname) return 1;
            return 0;
        });

        return allSector;
    }catch(e){
        console.log("error en controller getAllSector", e.message)
    }
};

module.exports = getAllSector;

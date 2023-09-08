const { Sector, Salepoint } = require('../../bd');

const getAllSector = async() => {
    try{
        let allSector = await Sector.findAll({
            where: { isdelete: false},
            include:{
                model: Salepoint,
                attribute:["salepoint"]
            }
        })

        allSector.sort((a , b) => { return a.sectorname - b.sectorname })

        return allSector;
    }catch(e){
        console.log("error en controller getAllSector", e.message)
    }
};

module.exports = getAllSector;

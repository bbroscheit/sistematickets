const { Salepoint, Sector } = require('../../bd');

const getAllSalepoint = async() => {
    try {
        let allSalepoint = await Salepoint.findAll({
            where:{isdelete:false}, 
            include:[{
                model: Sector,
                attribute: ["sectorname"]
            }]
        });
        return allSalepoint
    } catch (e) {
        console.log( "error en controller getAllSalepoint", e.message)
    }
}

module.exports = getAllSalepoint;
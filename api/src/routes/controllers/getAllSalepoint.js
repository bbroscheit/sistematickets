const { Salepoint } = require('../../bd');

const getAllSalepoint = async() => {
    try {
        let allSalepoint = await Salepoint.findAll({
            where:{isdelete:false}
        });
        return allSalepoint
    } catch (e) {
        console.log( "error en controller getAllSalepoint", e.message)
    }
}

module.exports = getAllSalepoint;
const { Salepoint } = require('../../bd');

const postSalepoint = async (salepoint) => {
    try {
            let newSalepoint = await Salepoint.create({
            salepoint,
        })
        return newSalepoint;
    } catch (e) {
        console.log("error en controller postSalepoint", e.message)
    }
    
}

module.exports = postSalepoint;
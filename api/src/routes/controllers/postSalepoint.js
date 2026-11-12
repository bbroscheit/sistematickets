const { Salepoint } = require('../../bd');

// crea un punto de venta / sucursal nuevo
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
const { Salepoint } = require('../../bd');

// "elimina" un punto de venta / sucursal (soft delete)
const deleteSalepoint = async (id) => {
    try{
        let updateSalepoint = await Salepoint.findByPk(id);
        await updateSalepoint.update(
            {isdelete : true},
            {where : {id:id}}
        )
        return updateSalepoint
    }catch(e){
        console.log( "error en controller deleteSalepoint", e.message)
    }
}

// esto decia "module.expodeletedProject" (ni siquiera es una propiedad que
// exista), asi que el export quedaba vacio y la ruta de borrar un punto de
// venta tiraba error siempre. lo arreglo porque es un error de tipeo, no
// un cambio de comportamiento
module.exports = deleteSalepoint
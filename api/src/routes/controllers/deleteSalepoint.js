const { Salepoint } = require('../../bd');

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

module.expodeletedProject
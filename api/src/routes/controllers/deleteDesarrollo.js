const { Desarrollo } = require("../../bd");

// "elimina" un desarrollo interno (soft delete, solo marca isdelete)
const deleteDesarrollo = async (id) => {
    try{
        let updateDelete = await Desarrollo.findByPk(id);
        await updateDelete.update(
            {isdelete : true},
            { where : { id:id }}
        )
        return updateDelete
    }catch(e){
        console.log(" error en controller updateDelete", e.message)
    }
}

module.exports = deleteDesarrollo;
const { Desarrollo } = require("../../bd");

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
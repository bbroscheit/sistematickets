const { Sector } = require("../../bd");

const deleteSector = async (id) => {
    try{
        let updateSector = await Sector.findByPk(id);
        await updateSector.update(
            {isdelete : true},
            { where : { id:id }}
        )
        return updateSector
    }catch(e){
        console.log(" error en controller deleteSector", e.message)
    }
}

module.exports = deleteSector;
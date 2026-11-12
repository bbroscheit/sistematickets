const { Sector } = require("../../bd");

// "elimina" un sector (soft delete) - ver sector.js sobre el tema de los
// sectores duplicados en produccion, esto no tiene que ver con eso
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
const { Sector } = require("../../bd");

// activa/desactiva un sector (isdelete = true significa inactivo). a
// diferencia de deleteSector.js (que solo pone isdelete:true), este permite
// tambien reactivarlo
const updateSectorStatus = async (id, isdelete) => {
    try {
        let sector = await Sector.findByPk(id);
        if (!sector) return null;
        await sector.update({ isdelete });
        return sector;
    } catch (e) {
        console.log(" error en controller updateSectorStatus", e.message)
    }
};

module.exports = updateSectorStatus;

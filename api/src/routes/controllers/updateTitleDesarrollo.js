const { Desarrollo } = require("../../bd");

const updateTitleDesarrollo = async ( id,  title) => {
    
    try {
    const desarrollo = await Desarrollo.findByPk(id);
    if (!desarrollo) throw new Error("Desarrollo no encontrado");

    await desarrollo.update({ title });

    return desarrollo;
  } catch (e) {
    console.log("Error en controller updateUsersDesarrollo:", e.message);
    throw e;
  }

};

module.exports = updateTitleDesarrollo;
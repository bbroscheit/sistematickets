const { Desarrollo } = require("../../bd");

const updateStateDesarrollo = async ( id,  title) => {
    
    try {
    const desarrollo = await Desarrollo.findByPk(id);
    if (!desarrollo) throw new Error("Desarrollo no encontrado");

    await desarrollo.update({ state : 2 });

    return desarrollo;
  } catch (e) {
    console.log("Error en controller updateStateDesarrollo:", e.message);
    throw e;
  }

};

module.exports = updateStateDesarrollo;
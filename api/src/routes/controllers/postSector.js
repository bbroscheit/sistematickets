const { Sector, Salepoint } = require('../../bd');

// crea un sector nuevo. el salepoint es opcional y usa la relacion
// belongsTo vieja (Sector->Salepoint) que en la practica casi nunca se
// carga (ver sector.js) - por eso casi todos los sectores quedan sin
// sucursal propia
const postSector = async (sectorName, salepoint) => {
    try{
        let newSector = await Sector.create({
            sectorname: sectorName,
        })

        if (salepoint) {
            let setSalepoint = await Salepoint.findOne({
              where: {
                salepoint: salepoint,
              },
            });
            if (setSalepoint) {
              await newSector.setSalepoint(setSalepoint.id);
            }
          }
        

        return newSector;
    }catch(e){
        console.log("error en controller postSector", e.message)
    }
}

module.exports= postSector;
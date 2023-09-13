const { Sector, Salepoint } = require('../../bd');

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
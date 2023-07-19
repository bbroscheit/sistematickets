const { Sector } = require('../../bd');

const postSector = async (sectorname) => {
    try{
        let postSector = await Sector.create({
            sectorname,
        })

        return postSector;
    }catch(e){
        console.log("error en controller postSector", e.message)
    }
}

module.exports= postSector;
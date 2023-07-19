const { Sector } = require('../../bd');

const getAllSector = async() => {
    try{
        let allSector = await Sector.findAll({
            where: { isdelete: false}
        })

        return allSector;
    }catch(e){
        console.log("error en controller getAllSector", e.message)
    }
};

module.exports = getAllSector;

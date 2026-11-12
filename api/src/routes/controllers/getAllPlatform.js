const { Platform} = require('../../bd');

// trae las plataformas activas (zoom, meet, etc)
const getAllPlatform = async () => {
    try{
        let getPlatform = await Platform.findAll({
            where: { isdelete : false },
        });

        getPlatform.sort((a , b) => { return a.name - b.name })

        return getPlatform;
    }catch(e){
        // este mensaje dice "getAllCapacitation" por un copy-paste, el error es de aca
        console.log( "error en controller getAllCapacitation" , e.message)
    }
}

module.exports = getAllPlatform;
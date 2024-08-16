const { Platform} = require('../../bd');

const getAllPlatform = async () => {
    try{
        let getPlatform = await Platform.findAll({
            where: { isdelete : false },
        });

        getPlatform.sort((a , b) => { return a.name - b.name })

        return getPlatform;
    }catch(e){
        console.log( "error en controller getAllCapacitation" , e.message)
    }
}

module.exports = getAllPlatform;
const {User} = require('../../bd');

// trae los usuarios marcados como developer (isworker). ojo que el sort
// hace "firstname - firstname", eso es resta entre strings asi que en
// la practica no ordena nada (siempre da NaN)
const getAllWorker = async () => {
    try {
        let allWorker = await User.findAll({
            where:{isdelete:false, isworker: true},  
        });

        allWorker.sort((a , b) => { return a.firstname - b.firstname })

        return allWorker;
    } catch (e) {
        console.log("Error en controllers/getAllWorker.js" , e.message)
    }
}



module.exports = getAllWorker;
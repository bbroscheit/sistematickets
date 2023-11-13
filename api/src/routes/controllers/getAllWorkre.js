const {User} = require('../../bd');

const getAllWorker = async () => {
    try {
        let allWorker = await User.findAll({
            where:{isdelete:false, isworker: true},  
        });

        allWorker.sort((a , b) => { return a.id - b.id })

        return allWorker;
    } catch (e) {
        console.log("Error en controllers/getAllWorker.js" , e.message)
    }
}



module.exports = getAllWorker;
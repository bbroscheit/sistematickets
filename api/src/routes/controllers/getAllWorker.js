const {User} = require('../../bd');

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
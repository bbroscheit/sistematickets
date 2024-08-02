const { Schedule } = require('../../bd');

const getAllSchedule = async() => {
    try {
        let allSchedule = await Schedule.findAll({
            where: { isdelete:false }, 
           
        }); 
        
        return allSchedule
    } catch (e) {
        console.log( "error en controller getAllSchedule", e.message)
    }
}

module.exports = getAllSchedule;
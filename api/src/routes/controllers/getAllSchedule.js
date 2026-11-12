const { Schedule } = require('../../bd');

// trae todas las reuniones activas, sin filtrar por fecha
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
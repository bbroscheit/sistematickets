const { Schedule } = require('../../bd')

// trae una reunion puntual por id
const getAllScheduleById = async (id) => {
            
    try {
        let getSchedule = await Schedule.findAll({
            where: [{ id : id } , {isdelete : false}],
            
        })

        
        return getSchedule

    } catch (e) {
        console.log("error en ruta getAllScheduleById", e.message)
    }

    
}

module.exports = getAllScheduleById
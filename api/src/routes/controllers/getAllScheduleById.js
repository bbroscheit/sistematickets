const { Schedule } = require('../../bd')


const getAllScheduleById = async (id) => {
        
    try {
        let getSchedule = await Schedule.findAll({
            where: [{ id : id } , {isdelete : false}],
            
        })

        return getSchedule

    } catch (e) {
        console.log("error en ruta getAllScheduleByDate", e.message)
    }
}

module.exports = getAllScheduleById
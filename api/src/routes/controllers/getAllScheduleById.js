const { Schedule } = require('../../bd')


const getAllScheduleById = async (id) => {
            
    try {
        let getSchedule = await Schedule.findAll({
            where: [{ id : id } , {isdelete : false}],
            
        })

        console.log("getSchedule", getSchedule)
        return getSchedule

    } catch (e) {
        console.log("error en ruta getAllScheduleById", e.message)
    }

    
}

module.exports = getAllScheduleById
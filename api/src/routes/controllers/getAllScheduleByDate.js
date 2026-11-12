const { Schedule } = require('../../bd')
const cambiaFechaATimeZone = require('../helpers/cambiaFechaATimeZone')

// trae las reuniones de un dia puntual, ordenadas por hora de inicio
const getAllScheduleByDate = async (date) => {
    const formatedDate = cambiaFechaATimeZone(date)
        
    try {
        let getSchedule = await Schedule.findAll({
            where: [{ startdate : formatedDate} , {isdelete : false}],
            
        })

        getSchedule.sort((a , b) => { return a.starthour - b.starthour })

        return getSchedule

    } catch (e) {
        console.log("error en ruta getAllScheduleByDate", e.message)
    }
}

module.exports = getAllScheduleByDate


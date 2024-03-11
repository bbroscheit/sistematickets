const { Schedule } = require('../../bd');
const cambiaFechaATimeZoneWithHour = require('../helpers/cambiaFechaATImeZoneWithHour');
const cambiaFechaATimeZone = require('../helpers/cambiaFechaATimeZone')

const postSchedule = async (detail, invited, accepted , startdate, starthour, finishhour) => {

        formatedDate = cambiaFechaATimeZone(startdate)
        formatedStarthour = cambiaFechaATimeZoneWithHour(startdate , starthour)
        formatedFinishhour = cambiaFechaATimeZoneWithHour(startdate, finishhour)

       
    try {
            let newSchedule = await Schedule.create({
                detail,
                invited,
                accepted,
                startdate: formatedDate,
                starthour: formatedStarthour,
                finishhour : formatedFinishhour
        })
       return newSchedule;
    } catch (e) {
        console.log("error en controller postSchedule", e.message)
    }
    
} 

module.exports = postSchedule;
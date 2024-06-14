// const { Schedule } = require('../../bd')
// const cambiaFechaATimeZone = require('../helpers/cambiaFechaATimeZone')


// const getAllScheduleByDate = async (date) => {
//     const formatedDate = cambiaFechaATimeZone(date)
        
//     try {
//         let getSchedule = await Schedule.findAll({
//             where: [{ startdate : formatedDate} , {isdelete : false}],
            
//         })

//         getSchedule.sort((a , b) => { return a.starthour - b.starthour })

//         return getSchedule

//     } catch (e) {
//         console.log("error en ruta getAllScheduleByDate", e.message)
//     }
// }

// module.exports = getAllScheduleByDate

// const { Schedule } = require('../../bd'); // Asegúrate de importar tu modelo Schedule
// const cambiaFechaATimeZone = require('../helpers/cambiaFechaATimeZone')

// const getAllScheduleByDate = async (date) => {
//     const formatedDate = cambiaFechaATimeZone(date)
//     console.log("date", date, "formated date", formatedDate)

//     try {
//         const schedules = await Schedule.findAll({
//             where: {
//                 startdate: formatedDate
//             }
//         });

//         console.log("schedules", schedules)

//         return schedules;

//     } catch (error) {
//         console.error('Error fetching schedules by date:', error);
//         throw new Error('Error fetching schedules by date');
//     }
// };

// module.exports = getAllScheduleByDate;

const { Schedule, Op } = require('../../bd');
const dayjs = require('dayjs');
const cambiaFechaATimeZone = require('../helpers/cambiaFechaATimeZone');

const getAllScheduleByDate = async (date) => {

    const formattedDate = cambiaFechaATimeZone(date);
    const startOfDay = dayjs(formattedDate).startOf('day').toDate();
    const endOfDay = dayjs(formattedDate).endOf('day').toDate();
    
    console.log("startOfDay", startOfDay);
    console.log("endOfDay", endOfDay);
    try {
        const schedules = await Schedule.findAll({
            where: {
                startdate: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
            
        });

        console.log("schedules", schedules);

        return schedules;

    } catch (error) {
        console.error('Error fetching schedules by date:', error);
        throw new Error('Error fetching schedules by date');
    }
};

module.exports = getAllScheduleByDate;
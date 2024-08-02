const { Schedule, Op } = require('../../bd');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const subtractHours = require('../helpers/subtractHours')

dayjs.extend(utc);
dayjs.extend(timezone);

const getAllScheduleByDateBase = async (date, startHour, finishHour) => {

    const timezone = 'America/Argentina/Buenos_Aires';

    const adjustedStartHour = subtractHours(startHour, 3);
    const adjustedFinishHour = subtractHours(finishHour, 3);

    const startDateTime = dayjs.tz(`${date} ${adjustedStartHour}`, timezone).toDate();
    const finishDateTime = dayjs.tz(`${date} ${adjustedFinishHour}`, timezone).toDate();
   
    try {
        const schedules = await Schedule.findAll({
            where: {
                isdelete : true ,
                [Op.or]: [
                    {
                        starthour: {
                            [Op.between]: [startDateTime, finishDateTime]
                        }
                    },
                    {
                        finishhour: {
                            [Op.between]: [startDateTime, finishDateTime]
                        }
                    },
                    {
                        starthour: {
                            [Op.lte]: startDateTime
                        },
                        finishhour: {
                            [Op.gte]: finishDateTime
                        }
                    }
                ]
            }
        });

        console.log("schedules" , schedules)
        return schedules


    } catch (error) {
        console.error('Error fetching schedules by date:', error);
        throw new Error('Error fetching schedules by date');
    }
};

module.exports = getAllScheduleByDateBase;
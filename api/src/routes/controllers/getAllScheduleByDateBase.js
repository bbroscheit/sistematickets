const { Schedule, Op } = require('../../bd');
const dayjs = require('dayjs');

const getAllScheduleByDate = async (date) => {

    console.log("date", date)
    const startOfDay = dayjs(date).startOf('day').toDate();
    const endOfDay = dayjs(date).endOf('day').toDate();
    
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
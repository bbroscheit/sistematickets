const { Schedule } = require('../../bd');

const getAllSchedule = async() => {
    try {
        let allSchedule = await Schedule.findAll({
            where: { isdelete:false }, 
            // include:[{
            //     model: Userstories,
            //     as: 'userstory'
            //     // attribute: ["taskname"]
            // }]
        }); 
        
        // let taskOrder = allTask.sort((a , b) => { return a.state - b.state })
        // taskOrder.sort((a,b) => {return a.id - b.id })

        // return taskOrder
        return allSchedule
    } catch (e) {
        console.log( "error en controller getAllSchedule", e.message)
    }
}

module.exports = getAllSchedule;
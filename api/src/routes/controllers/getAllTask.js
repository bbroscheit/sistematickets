const { Project, User, Userstories, Task } = require('../../bd');

const getAllTask = async() => {
    try {
        let allTask = await Task.findAll({
            where: { isdelete:false }, 
            include:[{
                model: Userstories,
                as: 'userstory'
                // attribute: ["taskname"]
            }]
        }); 
        
        // let taskOrder = allTask.sort((a , b) => { return a.state - b.state })
        // taskOrder.sort((a,b) => {return a.id - b.id })

        // return taskOrder
        return allTask
    } catch (e) {
        console.log( "error en controller getAllTask", e.message)
    }
}

module.exports = getAllTask;
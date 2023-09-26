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
        return allTask
    } catch (e) {
        console.log( "error en controller getAllTask", e.message)
    }
}

module.exports = getAllTask;
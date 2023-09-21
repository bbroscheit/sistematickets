const { Project, User, Userstories, Task } = require('../../bd');

const getAllUserstories = async() => {
    try {
        let allUserstories = await Userstories.findAll({
            where: { isdelete:false }, 
            // include:[{
            //     model: Task,
            //     attribute: ["taskname"]
            // }]
        });
        return allUserstories
    } catch (e) {
        console.log( "error en controller getAllUserStories", e.message)
    }
}

module.exports = getAllUserstories;
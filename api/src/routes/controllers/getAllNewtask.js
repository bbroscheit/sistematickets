const { Project, User, Newtask } = require('../../bd');

// trae las tareas V2 activas, ordenadas por fecha de fin
const getAllNewTask = async() => {
    try {
        let allTask = await Newtask.findAll({
            where: { isdelete: false },
            include:[{
                model: User,
                attribute: ["username"]
            }]
        }); 
        
        allTask.sort((a, b) => {
            const dateA = new Date(a.taskfinishdate);
            const dateB = new Date(b.taskfinishdate);
            return dateA - dateB;
        });

        
        return allTask
    } catch (e) {
        console.log( "error en controller getAllTask", e.message)
    }
}

module.exports = getAllNewTask;
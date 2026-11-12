const { Project, User, Userstories, Task } = require('../../bd');

// modulo viejo (V1): trae las tareas activas con su userstory. el sort
// por estado que esta comentado abajo no tenia mucho sentido (state es
// texto, no numero), por eso quedo desactivado y se devuelve sin ordenar
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
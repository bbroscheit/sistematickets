const { Newtask } = require('../../bd')

// marca una tarea V2 como cumplida (el checkbox de la tarea)
const updateCheckNewTask = async (idTask) => {
    let setTicket = await Newtask.update(
        { state: 'cumplido' },
        { where: { id:idTask } } 
      );

    return setTicket
    
}

module.exports= updateCheckNewTask
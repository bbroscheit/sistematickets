const { Task } = require('../../bd')

// modulo viejo (V1): marca una tarea como cumplida
const updateCheckTask = async (id) => {
    let setTicket = await Task.update(
        { state: 'cumplido' },
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateCheckTask
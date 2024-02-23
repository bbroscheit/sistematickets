const { Newtask } = require('../../bd')

const updateCheckNewTask = async (idTask) => {
    let setTicket = await Newtask.update(
        { state: 'cumplido' },
        { where: { id:idTask } } 
      );

    return setTicket
    
}

module.exports= updateCheckNewTask
const { Task } = require('../../bd')

const updateCheckTask = async (id) => {
    let setTicket = await Task.update(
        { state: 'cumplido' },
        { where: { id:id } } 
      );

    return setTicket
    
}

module.exports= updateCheckTask
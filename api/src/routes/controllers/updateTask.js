const { Newtask } = require('../../bd')

const updateTask = async (id , description) => {
    console.log("task", id, description)
    let task = await Newtask.update(
        { taskdetail: description },
        { where: { id:id } } 
      );

    return task
    
}

module.exports= updateTask
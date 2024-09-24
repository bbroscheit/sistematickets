const { Newtask } = require('../../bd')

const updateNewtask = async (id , taskfinishdate) => {
  //console.log("finishdate", taskfinishdate)
    let setTask = await Newtask.update(
        { state: 'generado' , taskfinishdate : taskfinishdate },
        { where: { id:id } } 
      );

    return setTask
    
}

module.exports= updateNewtask
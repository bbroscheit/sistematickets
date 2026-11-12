const { Newtask } = require('../../bd')

// cambia la fecha de fin de una tarea V2 y la vuelve a poner en "generado"
const updateNewtask = async (id , taskfinishdate) => {
  //console.log("finishdate", taskfinishdate)
    let setTask = await Newtask.update(
        { state: 'generado' , taskfinishdate : taskfinishdate },
        { where: { id:id } } 
      );

    return setTask
    
}

module.exports= updateNewtask
const { Newproject } = require('../../bd')

// marca un proyecto V2 como finalizado
const updateProjectState = async (id) => {

    let setProject = await Newproject.update(
        { state: 'Finalizado' },
        { where: { id:id } } 
      );

    return setProject
    
}

module.exports= updateProjectState
const { Newproject } = require('../../bd')

const updateProjectState = async (id) => {

    let setProject = await Newproject.update(
        { state: 'Finalizado' },
        { where: { id:id } } 
      );

    return setProject
    
}

module.exports= updateProjectState
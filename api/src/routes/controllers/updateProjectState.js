const { Project } = require('../../bd')

const updateProjectState = async (id) => {
    let setProject = await Project.update(
        { state: 'finalizado' },
        { where: { id:id } } 
      );

    return setProject
    
}

module.exports= updateProjectState
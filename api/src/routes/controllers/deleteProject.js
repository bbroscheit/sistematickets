const { Project } = require('../../bd')

const deleteProject = async (id) => {
    try {
            let deletedProject = await Project.findByPk(id)
            await deletedProject.update(
                { isdelete : true },
                { where: { id : id } }
    )

    return deletedProject;
    } catch (error) {
        console.log("error en deleting project" , e.message) 
    }
   
} 

module.exports = deleteProject
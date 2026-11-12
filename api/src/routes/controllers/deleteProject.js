const { Project } = require('../../bd')

// "elimina" un proyecto del modulo viejo (soft delete). project.js es el
// modelo legacy, hoy se usa newproject.js (ver updateNewProject.js, etc)
const deleteProject = async (id) => {
    try {
            let deletedProject = await Project.findByPk(id)
            await deletedProject.update(
                { isdelete : true },
                { where: { id : id } }
    )

    return deletedProject;
    } catch (error) {
        // ojo: esto decia "e.message" pero la variable del catch es "error"
        console.log("error en deleting project" , error.message)
    }

}

module.exports = deleteProject
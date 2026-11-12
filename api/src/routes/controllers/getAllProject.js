const { Project, User, Userstories} = require('../../bd')

// trae los proyectos del modulo viejo (V1) activos, con sus userstories.
// hoy se usa newproject.js para proyectos nuevos
const getAllProjects = async () => {
    try {
        let getAllProject = await Project.findAll(
            {
                where: { isdelete : false},
                include:[{
                    model: User,
                    attribute: ["username"]
                },
                {
                    model: Userstories,
                    attributes: ["storiesname","state"],
                    where:{isdelete: false},
                    required:false
                }
            ]
        }
        )

        getAllProject.sort(( a, b ) => { return a.id - b.id } )

        return getAllProject

    } catch (e) {
        console.log("error en ruta getAllProject", e.message)
    }
}

module.exports = getAllProjects
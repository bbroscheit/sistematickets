const { Newproject, User, Newtask, Formproject, sequelize} = require('../../bd')

// trae los proyectos V2 activos con sus tareas (ordenadas por fecha de
// fin) y los archivos adjuntos (formproject)
const getAllNewProjects = async () => {
    try {
        let getAllProject = await Newproject.findAll(
            {
                where: { isdelete : false },
                include:[{
                    model: User,
                    attribute: ["username"]
                 },
                 {
                    model: Newtask,
                    attributes: ["id","state","taskdetail", "taskfinishdate"],
                    where:{isdelete: false},
                    include:[
                        {
                            model: User,
                            attributes: ["username", "lastname", "firstname"] 
                        }
                    ],
                    required: false,
                    order: [
                        [sequelize.literal('CAST("Newtask"."taskfinishdate" AS DATE)'), 'ASC'] 
                    ]
                },
                {
                    model: Formproject,
                    required: false,
                    
                }
            ]
        }
        )

        getAllProject.sort(( a, b ) => { return a.id - b.id } )

        return getAllProject

    } catch (e) {
        console.log("error en ruta getAllNewProject", e.message)
    }
}

module.exports = getAllNewProjects
const { Project, User, Userstories} = require('../../bd')

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
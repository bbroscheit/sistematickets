const { Project, User, Userstories} = require('../../bd')

const getAllProjects = async () => {
    try {
        let getAllProject = await Project.findAll({
            where: { isdelete : false},
            include:[{
                model: User,
                attribute: ["username"]
            },
                {
                    model: Userstories,
                    attributes: ["storiesname"],
                    where:{isdelete: false}
                }
            ]
        })

        getAllProject.sort(( a, b ) => { return a.id - b.id } )

        return getAllProject

    } catch (e) {
        console.log("error en ruta getAllProject", e.message)
    }
}

module.exports = getAllProjects
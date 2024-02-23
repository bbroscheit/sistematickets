const { Newproject, User, Newtask, sequelize} = require('../../bd')

const getAllNewProjects = async () => {
    try {
        let getAllProject = await Newproject.findAll(
            {
                where: { isdelete : false},
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
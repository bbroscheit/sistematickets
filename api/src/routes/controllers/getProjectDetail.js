const { Project, User, Userstories} = require('../../bd')

const getProjectDetail = async (id) => {
    try {
        let getDetail = await Project.findAll({
            where: [{ isdelete : false},{ id : id}],
            include:[{
                model: User,
                attribute: ["username"]
            },
                {
                    model: Userstories,
                    attributes: ["id","storiesname", "storiesdetail"],
                    where:{isdelete: false},
                    required: false
                }
            ]
        })

        getDetail.sort(( a, b ) => { return a.id - b.id } )

        return getDetail

    } catch (e) {
        console.log("error en ruta getAllProject", e.message)
    }
}

module.exports = getProjectDetail
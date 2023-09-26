const { Project, User, Userstories, Task} = require('../../bd')

const getStoriedetail = async (id) => {
    try {
        let getDetail = await Userstories.findAll({
            where: [{ isdelete : false},{ id : id}],
            include:[{
                model: Project,
                attribute: ["id", "projectname"]
            },
                {
                    model: Task,
                    where:{isdelete: false},
                    required: false
                }
            ]
        })

        getDetail.sort(( a, b ) => { return a.id - b.id } )

        return getDetail

    } catch (e) {
        console.log("error en ruta getStoriedetail", e.message)
    }
}

module.exports = getStoriedetail
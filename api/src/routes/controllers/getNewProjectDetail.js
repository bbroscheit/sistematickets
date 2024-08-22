const { Newproject, User, Newtask, Formproject, sequelize} = require('../../bd')

const getNewProjectDetail = async (id) => {
    
    try {
        let getDetail = await Newproject.findAll({
            where: [{ isdelete : false},{ id : id}],
            include:[{
                model: User,
                attribute: ["username"]
            }
            ,
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
        })

        return getDetail

    } catch (e) {
        console.log("error en ruta getNewProjectDetail", e.message)
    }
}

module.exports = getNewProjectDetail
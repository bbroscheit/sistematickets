const { Project, User } = require('../../bd')

const postProject = async (state, requirer , projectname, projectdetail ) => {
    try {
        let newProject = await Project.create(
            state,
            projectname,
            projectdetail
        )

        if(requirer){
            let require = User.findAll({
                where: [{ isdelete: false }, { username: requirer }]
            })
            if(require){
                await newProject.addUser(require.id)
            }
        }

        return newProject


    } catch (e) {
        console.log("error en postProject", e.message)
    }
}

module.exports = postProject
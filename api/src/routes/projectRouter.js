const projectRouter = require('express').Router()
const { canTreatArrayAsAnd } = require('sequelize/types/utils')
const getAllProject = require('../routes/controllers/getAllProject')
const postProject = require('./controllers/postProject')

projectRouter.get( '/project' , async (req, res) => {
    try{
        let allProject = getAllProject()
        allProject ? res(200).json(allProject) : res(400).send("failure") 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.post( '/project' , async (req, res) => {
    const { state, requirer , projectname, projectdetail } = req.body
    try {
        let newProject = await postProject(state, requirer , projectname, projectdetail)
        newProject ? res(200).send("sucess") : res(400).send("failure")
    } catch (e) {
        console.log("error en project router", e.message)
    }
})

projectRouter.delete( '/projectdelete', async (req, res) => {
    const { id } = req.params
    try {
        let deletedProject = await deleteProject(id)
    } catch (e) {
        console.log("error deleting project", e.message)
    }
})


module.exports = projectRouter
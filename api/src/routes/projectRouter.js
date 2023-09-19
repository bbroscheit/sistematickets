const projectRouter = require("express").Router()
const getAllProject = require('../routes/controllers/getAllProject')
const postProject = require('./controllers/postProject')

projectRouter.get("/project" , async (req, res) => {
    try{
        let allProject = await getAllProject()
        allProject ? res.status(200).json(allProject) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.post( '/project' , async (req, res) => {
    const { state,  projectname, projectdetail,requirer , worker} = req.body
    
    try {
        let newProject = await postProject(state, projectname, projectdetail, requirer, worker)
        newProject ? res.status(200).json("sucess")  : res.status(400).send("failure")
    } catch (e) {
        console.log("error en project router", e.message)
    }
})

// projectRouter.delete( '/projectdelete', async (req, res) => {
//     const { id } = req.params
//     try {
//         let deletedProject = await deleteProject(id)
//     } catch (e) {
//         console.log("error deleting project", e.message)
//     }
// })


module.exports = projectRouter
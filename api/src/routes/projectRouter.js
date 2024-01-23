const projectRouter = require("express").Router()
const getAllProject = require('../routes/controllers/getAllProject')
const postProject = require('./controllers/postProject')
const getProjectDetail = require('./controllers/getProjectDetail')
const getAllProjectsStoriesTask = require("./controllers/getAllProjectStoriesTasks")
const updateProjectState = require("../routes/controllers/updateProjectState")

projectRouter.get("/project" , async (req, res) => {
    try{
        let allProject = await getAllProject()
        allProject ? res.status(200).json(allProject) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.get("/projectStoriesTask" , async (req, res) => {
    try{
        let allProject = await getAllProjectsStoriesTask()
        allProject ? res.status(200).json(allProject) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.get("/project/:id" , async (req, res) => {
    const id = req.params.id
    
    try{
        let projectDetail = await getProjectDetail(id)
        projectDetail ? res.status(200).json(projectDetail) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.put("/project/:id" , async (req, res) => {
    const id = req.params.id
    try{
        let changeProjectState = await updateProjectState(id)
        changeProjectState ? res.status(200).json(changeProjectState) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.post( '/project' , async (req, res) => {
    const { state, projectname, projectdetail, requirer , worker, finishdate} = req.body
    
    try {
        let newProject = await postProject(state, projectname, projectdetail, requirer, worker, finishdate)
        console.log("newProject", newProject)
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
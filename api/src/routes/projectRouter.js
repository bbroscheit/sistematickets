const projectRouter = require("express").Router()
const uploadFiles = require('./middlewares/uploadFiles');
const getAllProject = require('../routes/controllers/getAllProject')
const getAllNewProject = require('../routes/controllers/getAllNewProject')
const postProject = require('./controllers/postProject')
const postNewProject = require('../routes/controllers/postNewProject')
const getProjectDetail = require('./controllers/getProjectDetail')
const getProjectByWorker = require('../routes/controllers/getProjectByWorker')
const getNewProjectDetail = require('../routes/controllers/getNewProjectDetail')
const getAllProjectsStoriesTask = require("./controllers/getAllProjectStoriesTasks")
const updateProjectState = require("../routes/controllers/updateProjectState")
const updateNewProject = require("../routes//controllers/updateNewProject")

projectRouter.get("/project" , async (req, res) => {
    try{
        let allProject = await getAllProject()
        allProject ? res.status(200).json(allProject) : res.status(400).json({ state : "failure"}) 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.get("/newproject" , async (req, res) => {
    try{
        let allProject = await getAllNewProject()
        allProject ? res.status(200).json(allProject) : res.status(400).json({ state : "failure"}) 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.get("/projectStoriesTask" , async (req, res) => {
    try{
        let allProject = await getAllProjectsStoriesTask()
        allProject ? res.status(200).json(allProject) : res.status(400).json({ state : "failure"}) 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.get("/project/:id" , async (req, res) => {
    const id = req.params.id
    
    try{
        let projectDetail = await getProjectDetail(id)
        projectDetail ? res.status(200).json(projectDetail) : res.status(400).json({ state : "failure"}) 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.get("/newproject/:id" , async (req, res) => {
    const id = req.params.id
    
    try{
        let projectDetail = await getNewProjectDetail(id)
        projectDetail ? res.status(200).json(projectDetail) : res.status(400).json({ state : "failure"}) 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.get( '/projectByWorker' , async ( req, res ) => {
    const workerName = req.query.worker
    
    try {
        let project = await getProjectByWorker(workerName);
        project ? res.status(200).json(project) : res.status(400).json({ state:"failure" })
    } catch (e) {
        console.log( "error en ruta get getProjectByWorker" , e.message)
    }
})

projectRouter.put("/project/:id" , async (req, res) => {
    const id = req.params.id
    
    try{
        let changeProjectState = await updateProjectState(id)
        changeProjectState ? res.status(200).json({ state : "success"}) : res.status(400).json({ state : "failure"}) 
    }catch (e){
        console.log("error en project router", e.message)
    }
})

projectRouter.post( '/project' , uploadFiles() , async (req, res) => {
    const { state, projectname, projectdetail, requirer , worker, finishdate} = req.body
    
    try {
        let newProject = await postProject(state, projectname, projectdetail, requirer, worker, finishdate, req.files )
        
        newProject ? res.status(200).json({state: "success"})  : res.status(400).json({ state : "failure"})
    } catch (e) {
        console.log("error en project router", e.message)
    }
})

projectRouter.post( '/newproject' , uploadFiles() , async (req, res) => {
    const { state, projectname, projectdetail, requirer , worker, finishdate } = req.body
    
    try {
        let newProject = await postNewProject(state, projectname, projectdetail, requirer, worker, finishdate , req.files)
        
        newProject ? res.status(200).json({state: "success"})  : res.status(400).json({ state : "failure"})
    } catch (e) {
        console.log("error en postNewProject", e.message)
    }
})

projectRouter.put( '/updateproject' , uploadFiles() , async (req, res) => {
    const { idProject,  projectname, projectdetail, requirer , worker, finishdate } = req.body
    console.log("entre a la ruta")
    try {
        let newProject = await updateNewProject( idProject, projectname, projectdetail, requirer, worker, finishdate , req.files)
        
        newProject ? res.status(200).json({state: "success"}) : res.status(400).json({ state : "failure"})
    } catch (e) {
        console.log("error en updateProject", e.message)
    }
})

module.exports = projectRouter
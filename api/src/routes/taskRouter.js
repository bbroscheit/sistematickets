const taskRouter = require("express").Router()
const getAllTask = require("./controllers/getAllTask")
const getAllNewTask = require('./controllers/getAllNewtask')
const getUserInTask = require('./controllers/getUserInTask')
const getTaskById = require ('./controllers/getTaskById')
const postTask = require('./controllers/postTask')
const updateCheckTask = require("./controllers/updateCheckTask")
const updateCheckNewTask = require('./controllers/updateCheckNewtask')
const updateNewtask = require('./controllers/updateNewtask')

taskRouter.get("/task" , async (req, res) => {
    
    try{
        let allTask = await getAllTask()
        allTask ? res.status(200).json(allTask) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en task router", e.message)
    }
    
})

taskRouter.get("/task/:id" , async (req, res) => {
    const { id } = req.params

    try{
        let task = await getTaskById(id)
        task ? res.status(200).json(task) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en task router", e.message)
    }
    
})

taskRouter.get("/newtask" , async (req, res) => {
    
    try{
        let allTask = await getAllNewTask()
        allTask ? res.status(200).json(allTask) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en task router", e.message)
    }
    
})

taskRouter.post( '/task' , async (req, res) => {
    const { idProject, state, taskdetail, taskfinishdate, worker } = req.body
    
    try {
        let newTask = await postTask( idProject, state, taskdetail, taskfinishdate, worker )
        newTask ? res.status(200).json({state: "success"})  : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en task post router", e.message)
    }
})

taskRouter.put( '/task/:id' , async (req, res) => {
    const { id } = req.params
    
    try {
        let updateTask= await updateCheckTask( id )
        updateTask ? res.status(200).json("sucess")  : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en task post router", e.message)
    }
})

taskRouter.put( '/newtask/:idTask' , async (req, res) => {
    const { idTask } = req.params
    
    try {
        let updateTask= await updateCheckNewTask( idTask )
        updateTask ? res.status(200).json({state:"success"})  : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en task post router", e.message)
    }
})

taskRouter.put( '/updateNewtask' , async (req, res) => {
    const { id , taskfinishdate } = req.body
    
    try {
        let updateTask= await updateNewtask( id , taskfinishdate )
        updateTask ? res.status(200).json({state:"success"})  : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en task post router", e.message)
    }
})

taskRouter.get( '/userByTask/:id' , async (req, res) => {
    const { id } = req.params
    
    try {
        let userTask= await getUserInTask( id )
        userTask ? res.status(200).json(userTask)  : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en task post router", e.message)
    }
})

module.exports = taskRouter
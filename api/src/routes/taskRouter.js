const taskRouter = require("express").Router()
const getAllTask = require("./controllers/getAllTask")
const postTask = require('./controllers/postTask')
const updateCheckTask = require("./controllers/updateCheckTask")

taskRouter.get("/task" , async (req, res) => {
    
    try{
        let allTask = await getAllTask()
        allTask ? res.status(200).json(allTask) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en task router", e.message)
    }
    
})

taskRouter.post( '/task' , async (req, res) => {
    const { idStorie, state, taskdetail, taskfinishdate } = req.body
    
    try {
        let newTask = await postTask( idStorie, state, taskdetail, taskfinishdate )
        newTask ? res.status(200).json("sucess")  : res.status(400).send("failure")
    } catch (e) {
        console.log("error en task post router", e.message)
    }
})

taskRouter.put( '/task/:id' , async (req, res) => {
    const { id } = req.params
    
    try {
        let updateTask= await updateCheckTask( id )
        updateTask ? res.status(200).json("sucess")  : res.status(400).send("failure")
    } catch (e) {
        console.log("error en task post router", e.message)
    }
})

module.exports = taskRouter
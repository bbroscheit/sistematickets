const userstoriesRouter = require("express").Router()
const getAllUserStories = require("./controllers/getAllUserstories")
const getStoriedetail = require('./controllers/getStoriedetail')
const postUserStories = require('./controllers/postuserStories')

userstoriesRouter.get("/userstories" , async (req, res) => {
    
    try{
        let allUserstories = await getAllUserStories()
        allUserstories ? res.status(200).json(allUserstories) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en userstorie router", e.message)
    }
    
})

userstoriesRouter.get(`/userstories/:id` , async (req, res) => {
    const { id } = req.params
    try{
        let userdetail = await getStoriedetail(id)
        userdetail ? res.status(200).json(userdetail) : res.status(400).send("failure") 
    }catch (e){
        console.log("error en userstorie router", e.message)
    }
    
})

userstoriesRouter.post( '/userstories' , async (req, res) => {
    const { id, state, storiesname, storiesdetail, priority } = req.body
    
    try {
        let newUserstories = await postUserStories( id, state, storiesname, storiesdetail, priority)
        newUserstories ? res.status(200).json("sucess")  : res.status(400).send("failure")
    } catch (e) {
        console.log("error en project router", e.message)
    }
})

module.exports = userstoriesRouter
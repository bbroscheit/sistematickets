const desarrolloRouter = require("express").Router()
const getAllDesarrollo = require('../routes/controllers/getAllDesarrollo')
const getDesarrolloById = require('../routes/controllers/getDesarrolloByID')
const postDesarrollo = require('../routes/controllers/postDesarrollo')
const updateUsersDesarrollo = require('../routes/controllers/updateUsersDesarrollo')
const updateTitleDesarrollo = require('../routes/controllers/updateTitleDesarrollo')
const updateStateDesarrollo = require('../routes/controllers/updateStateDesarrollo')
const deleteDesarrollo = require('../routes/controllers/deleteDesarrollo')

desarrolloRouter.get("/desarrollo" , async (req, res) => {
    
    try{
        let allDesarrollo = await getAllDesarrollo()
        allDesarrollo ? res.status(200).json(allDesarrollo) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en allDesarrollo router", e.message)
    }
    
})

desarrolloRouter.get("/desarrollo/:id" , async (req, res) => {
    const { id } = req.params
    
    try{
        let desarrollo = await getDesarrolloById(id)
        desarrollo ? res.status(200).json(desarrollo) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en desarrollo router", e.message)
    }
    
})

desarrolloRouter.put("/updateTitleDesarrollo/:id" , async (req, res) => {
    
    const { id } = req.params
    const { title } = req.body
    
    try{
        let desarrollo = await updateTitleDesarrollo(id, title)
        desarrollo ? res.status(200).json({state: "success"}) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en desarrollo router", e.message)
    }
    
})

desarrolloRouter.put("/updateUsersDesarrollo/:id" , async (req, res) => {
    //console.log("updateUsersDesarrollo router", req.body)
    const { id } = req.params
    const { users } = req.body
    
    try{
        let desarrollo = await updateUsersDesarrollo(id, users)
        desarrollo ? res.status(200).json({state: "success"}) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en desarrollo router", e.message)
    }
    
})

desarrolloRouter.put("/updateStateDesarrollo/:id" , async (req, res) => {
    const { id } = req.params
        
    try{
        let desarrollo = await updateStateDesarrollo(id)
        desarrollo ? res.status(200).json({state: "success"}) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en desarrollo router", e.message)
    }
    
})

desarrolloRouter.put("/deleteDesarrollo/:id" , async (req, res) => {
    const { id } = req.params
        
    try{
        let desarrollo = await deleteDesarrollo(id)
        desarrollo ? res.status(200).json({state: "success"}) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en desarrollo router", e.message)
    }
    
})

desarrolloRouter.post( '/desarrollo' , async (req, res) => {
    const { title, state = 1 , users } = req.body
    
    try {
        let newDesarrollo = await postDesarrollo( title, state , users)
        newDesarrollo ? res.status(200).json({state: "success"})  : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en newDesarrollo post router", e.message)
    }
})

// capacitationRouter.put( '/updateCapacitations' , async (req, res) => {
//     const { id, finishdate , finishhour, state } = req.body  

//     try {
//         let updateCapacitations = await updateCapacitation( id, finishdate , finishhour, state )
//         updateCapacitations ? res.status(200).json({state: "success"}) : res.status(400).json({state: "failure"})
//     } catch (e) {
//         console.log("error en updateCapacitation", e.message)
//     }
// })

module.exports = desarrolloRouter
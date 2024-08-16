const capacitationRouter = require("express").Router()
const getAllCapacitation = require('../routes/controllers/getAllCapacitation')
const getCapacitationById = require('../routes/controllers/getCapacitationById')
const postCapacitation = require('../routes/controllers/postCapacitation')
const updateCapacitation = require('../routes/controllers/updateCapacitation')
const getCapacitationByWorker = require('../routes/controllers/getCapacitationByWorker')



capacitationRouter.get("/capacitation" , async (req, res) => {
    
    try{
        let allCapacitation = await getAllCapacitation()
        allCapacitation ? res.status(200).json(allCapacitation) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en allCapacitation router", e.message)
    }
    
})

capacitationRouter.get("/capacitation/:id" , async (req, res) => {
    const { id } = req.params

    try{
        let capacitation = await getCapacitationById(id)
        capacitation ? res.status(200).json(capacitation) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en capacitation router", e.message)
    }
    
})

capacitationRouter.post( '/capacitation' , async (req, res) => {
    const { state, subject, teacher, students,  startdate, starthour, platform } = req.body
    
    try {
        let newCapacitation = await postCapacitation( state, subject, teacher, students,  startdate, starthour, platform )
        newCapacitation ? res.status(200).json({state: "success"})  : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en newCapacitation post router", e.message)
    }
})

capacitationRouter.put( '/updateCapacitations' , async (req, res) => {
    const { id, finishdate , finishhour, state } = req.body  

    try {
        let updateCapacitations = await updateCapacitation( id, finishdate , finishhour, state )
        updateCapacitations ? res.status(200).json({state: "success"}) : res.status(400).json({state: "failure"})
    } catch (e) {
        console.log("error en updateCapacitation", e.message)
    }
})

capacitationRouter.get( '/capacitationByWorker' , async ( req, res ) => {
    const workerName = req.query.worker
    
    try {
        let capacitation = await getCapacitationByWorker(workerName);
        capacitation !== 0 ? res.status(200).json(capacitation) : res.status(400).send([])
    } catch (e) {
        console.log( "error en ruta get capacitationByWorker" , e.message)
    }
})


module.exports = capacitationRouter
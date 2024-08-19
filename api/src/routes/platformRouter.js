const platformRouter = require("express").Router()
const getAllPlatform = require('./controllers/getAllPlatform')
const postPlatform = require('./controllers/postPlatform')
//const postCapacitation = require('../routes/controllers/postCapacitation')




platformRouter.get("/platform" , async (req, res) => {
    
    try{
        let allPlatform = await getAllPlatform()
        allPlatform ? res.status(200).json(allPlatform) : res.status(400).json({state: "failure"}) 
    }catch (e){
        console.log("error en allPlatform router", e.message)
    }
    
})

platformRouter.post("/postPlatform" , async (req, res) => {
    console.log("entre")
    // const { name, detail, masters } = req.body
    
    // try {
    //     let newPlatform = await postPlatform( name, detail, masters )
    //     newPlatform ? res.status(200).json({state: "success"})  : res.status(400).json({state: "failure"})
    // } catch (e) {
    //     console.log("error en newPlatform post router", e.message)
    // }
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

// capacitationRouter.get( '/capacitationByWorker' , async ( req, res ) => {
//     const workerName = req.query.worker
    
//     try {
//         let capacitation = await getCapacitationByWorker(workerName);
//         capacitation !== 0 ? res.status(200).json(capacitation) : res.status(400).send([])
//     } catch (e) {
//         console.log( "error en ruta get capacitationByWorker" , e.message)
//     }
// })


module.exports = platformRouter
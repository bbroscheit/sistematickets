const ticketRouter = require('express').Router()
const getAllTicket = require('./controllers/getAllTicket');
const postTicket = require('./controllers/postTicket');
const updateTicket = require('./controllers/updateTicket');



ticketRouter.get( '/ticket' , async ( req, res ) => {
    try {
        let allTicket = await getAllTicket();
        allTicket ? res.status(200).json(allTicket) : res.status(400).send("failure")        
    } catch (e) {
        console.log( "error en ruta get tickets" , e.message)
    }
})

ticketRouter.post( '/ticket', async ( req, res ) => {
    const {state, worker, subject, detail, created, startdate, finishdate, randomdate} = req.body;

    try {
        let newTicket = await postTicket(state, worker, subject, detail, created, startdate, finishdate, randomdate)
        newTicket ? res.status(200).send("sucess") : res.status(404).send("failure")
    } catch (e) {
        console.log ( "error en ruta post ticket" , e.message)
    }
})

ticketRouter.put( '/ticket' , async ( req, res ) => {
    const { id } = req.query
    const { state, worker, subject, detail, created, startdate, finishdate, randomdate, username } = req.body
    
    try {
        let updatedTicket = await updateTicket(id,state, worker, subject, detail, created, startdate, finishdate, randomdate, username)
        updatedTicket ? res.status(200).send("sucess") : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put ticket" , e.message)
    }
    
})

module.exports = ticketRouter;
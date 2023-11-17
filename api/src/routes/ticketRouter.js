const ticketRouter = require('express').Router()
const { format, parseISO, isDate } = require ('date-fns');
const getAllTicket = require('./controllers/getAllTicket');
const getTicketsDesarrollo = require('./controllers/getTicketDesarrollo');
const getTicketsDesarrollo2 = require('./controllers/getTicketDesarrollo2');
const getTicketCompletado = require('./controllers/getTicketCompletado');
const getTicketsGenerados = require('./controllers/getTicketGenerado');
const postTicket = require('./controllers/postTicket');
const updateTicket = require('./controllers/updateTicket');
const getTicketTerminado = require('./controllers/getTicketTerminado');
const getTicketDetail = require('./controllers/getTicketDetail');
const updateAssignment = require('./controllers/updateAssignment');
const updateSolutionTicket = require('./controllers/updateSolutionTicket');
const updateInfoTicket = require('./controllers/updateInfoTicket');
const updateInfoTicketByUser = require('./controllers/updateInfoTicketByUser');
const updateCloseTicket = require('./controllers/updateCloseTicket');
const uploadFiles = require('./middlewares/uploadFiles');




ticketRouter.get( '/ticket' , async ( req, res ) => {
    try {
        let allTicket = await getAllTicket();
        allTicket ? res.status(200).json(allTicket) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get tickets" , e.message)
    }
})

ticketRouter.get("/ticketDetail/:id" , async ( req, res ) => {
    const { id } = req.params
    try {
        let ticketDetail = await getTicketDetail(id);
        ticketDetail ? res.status(200).json(ticketDetail) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketDetail" , e.message)
    }
})

ticketRouter.get( '/ticketGenerados' , async ( req, res ) => {
    try {
        let ticketGenerados = await getTicketsGenerados();
        ticketGenerados ? res.status(200).json(ticketGenerados) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketGenerados" , e.message)
    }
})

ticketRouter.get( '/ticketDesarrollo' , async ( req, res ) => {
    try {
        let ticketDesarrollo = await getTicketsDesarrollo();
        ticketDesarrollo ? res.status(200).json(ticketDesarrollo) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketDesarrollo" , e.message)
    }
})

ticketRouter.get( '/ticketDesarrollo2' , async ( req, res ) => {
    try {
        let ticketDesarrollo2 = await getTicketsDesarrollo2();
        ticketDesarrollo2 ? res.status(200).json(ticketDesarrollo2) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketDesarrollo2" , e.message)
    }
})

ticketRouter.get( '/ticketCompletado' , async ( req, res ) => {
    try {
        let ticketCompletado = await getTicketCompletado();
        ticketCompletado ? res.status(200).json(ticketCompletado) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketCompletado" , e.message)
    }
})

ticketRouter.get( '/ticketTerminado' , async ( req, res ) => {
    try {
        let ticketTerminado = await getTicketTerminado();
        ticketTerminado ? res.status(200).json(ticketTerminado) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketTerminado" , e.message)
    }
})

ticketRouter.post( '/ticket', uploadFiles() , async ( req, res ) => {
    const { state, worker, subject, detail, answer = "Sin resolución", userresolved, user } = req.body;
    
    
    try {
         
        let newTicket = await postTicket(state, worker, subject, detail, answer, userresolved, user, req.files);  
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

ticketRouter.put( '/updateAssignment/:id' , async ( req, res ) => {
    const { id } = req.params
    const { name } = req.body

    
    try {
        let updatedTicket = await updateAssignment(id , name)
        updatedTicket ? res.status(200).send("sucess") : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateAssignment" , e.message)
    }

})

ticketRouter.put( '/updateSolutionTicket/:id' , async ( req, res ) => {
    const { id } = req.params
    const { solution } = req.body

    
    try {
        let updatedTicket = await updateSolutionTicket(id , solution)
        updatedTicket ? res.status(200).send("sucess") : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateSolutionTicket" , e.message)
    }

})

ticketRouter.put( '/updateInfoTicket/:id' , async ( req, res ) => {
    const { id } = req.params
    const { info } = req.body

    
    try {
        let updatedTicket = await updateInfoTicket(id , info)
        updatedTicket ? res.status(200).send("sucess") : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateInfoTicket" , e.message)
    }

})

ticketRouter.put( '/updateInfoTicketByUser/:id' , async ( req, res ) => {
    const { id } = req.params
    const { info } = req.body

    
    try {
        let updatedTicket = await updateInfoTicketByUser(id , info)
        updatedTicket ? res.status(200).send("sucess") : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateInfoTicket" , e.message)
    }

})

ticketRouter.put( '/updateCloseTicket/:id' , async ( req, res ) => {
    const { id } = req.params
        
    try {
        let updatedTicket = await updateCloseTicket(id)
        updatedTicket ? res.status(200).send("sucess") : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateInfoTicket" , e.message)
    }

})


module.exports = ticketRouter;
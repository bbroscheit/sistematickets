const ticketRouter = require('express').Router()
const { format, parseISO, isDate } = require ('date-fns');
const getAllTicket = require('./controllers/getAllTicket');
const getAllTicketUnfinished = require('./controllers/getAllTicketUnfinished')
const getTicketsDesarrollo = require('./controllers/getTicketDesarrollo');
const getTicketsDesarrollo2 = require('./controllers/getTicketDesarrollo2');
const getTicketCompletado = require('./controllers/getTicketCompletado');
const getTicketsAsignados = require('./controllers/getTicketAsignados')
const getTicketsGenerados = require('./controllers/getTicketGenerado');
const postTicket = require('./controllers/postTicket');
const updateTicket = require('./controllers/updateTicket');
const getTicketTerminado = require('./controllers/getTicketTerminado');
const getTicketDetail = require('./controllers/getTicketDetail');
const assigmentAcepted = require('./controllers/assigmentAcepted')
const updateAssignment = require('./controllers/updateAssignment');
const updateSolutionTicket = require('./controllers/updateSolutionTicket');
const updateInfoTicket = require('./controllers/updateInfoTicket');
const updateInfoTicketByUser = require('./controllers/updateInfoTicketByUser');
const updateCloseTicket = require('./controllers/updateCloseTicket');
const uploadFiles = require('./middlewares/uploadFiles');
const sendEmail = require('./helpers/sendEmail');
const sendEmailWorkerAssigment = require('./helpers/sendEmailWorkerAssigment')
const sendEmailWorkerAceptAssigment = require('./helpers/sendEmailWorkerAceptAssigment')
const sendEmailInfoToWorker = require('./helpers/sendEmailInfoToWorker');
const sendEmailInfoToUser = require ('./helpers/sendEmailInfoToUser')
const sendEmailUserComplete = require('./helpers/sendEmailUserComplete')
const sendEmailWorkerComplete = require('./helpers/sendEmailWorkerComplete');
const sendEmailWorkerFinish = require( './helpers/sendEmailWorkerFinish')
const sendEmailUserFinish = require('./helpers/sendEmailUserFinish')
const sendEmailNewTicket = require('./helpers/sendEmailNewTicket');
const sendEmailAdvertisement = require('./helpers/sendEmailAdvertisement')
const getTicketsPendientes24 = require('./controllers/getTicketsPendientes24')
const getTicketByWorker = require('./controllers/getTicketByWorker')
const updatePriority = require('./controllers/updatePriority')
const getPriority = require('./controllers/getPriority');
const getTicketsBySubject = require('./helpers/getTicketBySubject');
const getUserByName = require('./helpers/getUserByName');
const getworkerByName = require('./helpers/getWorkerByName')
const getUserEmailByTicketID = require('./helpers/getUserEmailByTicketID')
const getDetailWithoutQuestion = require('./helpers/getDetailWithoutQuestion')
const getLastQuestion = require('./helpers/getLastQuestion')
const getDetailOnly = require('./helpers/getOnlyDetail')


ticketRouter.get( '/ticket' , async ( req, res ) => {
    try {
        let allTicket = await getAllTicket();
        allTicket ? res.status(200).json(allTicket) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get tickets" , e.message)
    }
})

ticketRouter.get( '/ticketUnfinished' , async ( req, res ) => {
    try {
        let allTicket = await getAllTicketUnfinished();
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

ticketRouter.get( '/ticketAsignados' , async ( req, res ) => {
    try {
        let ticketAsignados = await getTicketsAsignados();
        ticketAsignados ? res.status(200).json(ticketAsignados) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketAsignados" , e.message)
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

ticketRouter.get( '/ticketsPendientes24' , async ( req, res ) => {
    
    try {
        let ticketPendiente = await getTicketsPendientes24();
        ticketPendiente ? res.status(200).json(ticketPendiente) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketPendiente24" , e.message)
    }
})

ticketRouter.get( '/priority' , async ( req, res ) => {
    console.log("entre en la ruta de prioridad")
    try {
        let prioridades = await getPriority();
        prioridades ? res.status(200).json(prioridades) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get prioridades" , e.message)
    }
})

ticketRouter.get( '/ticketsByWorker' , async ( req, res ) => {
    const workerName = req.query.worker
    
    try {
        let tickets = await getTicketByWorker(workerName);
        tickets ? res.status(200).json(tickets) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketsByWorker" , e.message)
    }
})

ticketRouter.post( '/ticket', uploadFiles() , async ( req, res ) => {
    const { state, worker, subject, detail, answer = "Sin resolución", userresolved, user } = req.body;
    
    try {
         
        let newTicket = await postTicket(state, worker, subject, detail, answer, userresolved, user, req.files);  
        newTicket ? res.status(200).json({state: "success"}) : res.status(404).send("failure")
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
        updatedTicket ? res.status(200).json({state: "success"}) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateAssignment" , e.message)
    }

})

ticketRouter.put( '/priorityAssigment/:id' , async ( req, res ) => {
    const { id } = req.params
    const { state } = req.body

    try {
        let updatedTicket = await updatePriority(id , state)
        updatedTicket ? res.status(200).send("sucess") : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updatePriority" , e.message)
    }

})


ticketRouter.put( '/ticketAssignment/:id' , async ( req, res ) => {
    const { id } = req.params
    
    try {
        let acepted = await assigmentAcepted(id)
        acepted ? res.status(200).json({state: "success"}) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put assigmentAcepted" , e.message)
    }

})

ticketRouter.put( '/updateSolutionTicket/:id' , async ( req, res ) => {
    const { id } = req.params
    const { solution } = req.body

    
    try {
        let updatedTicket = await updateSolutionTicket(id , solution)
        updatedTicket ? res.status(200).json({state: "success"}) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateSolutionTicket" , e.message)
    }

})

ticketRouter.put( '/updateInfoTicket/:id' , async ( req, res ) => {
    const { id } = req.params
    const { info } = req.body

    
    try {
        let updatedTicket = await updateInfoTicket(id , info)
        updatedTicket ? res.status(200).json({state: "success"}) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateInfoTicket" , e.message)
    }

})

ticketRouter.put( '/updateInfoTicketByUser/:id' , async ( req, res ) => {
    const { id } = req.params
    const { answer } = req.body

    
    try {
        let updatedTicket = await updateInfoTicketByUser(id , answer)
        updatedTicket ? res.status(200).json({state: "success"}) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateInfoTicket" , e.message)
    }

})

ticketRouter.put( '/updateCloseTicket/:id' , async ( req, res ) => {
    const { id } = req.params
        
    try {
        let updatedTicket = await updateCloseTicket(id)
        updatedTicket ? res.status(200).json({state: "success"}) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta put updateInfoTicket" , e.message)
    }

})

ticketRouter.post('/sendEmailNewTicket', async (req, res) => {
    const {subject, email} = req.body
        
    let findTicket = await getTicketsBySubject(subject)
    
    try {
        await sendEmail( email, findTicket);
        await sendEmailNewTicket(findTicket);
        
    } catch (e) {
        console.log(e.message)
    }

    res.send('Emails enviados exitosamente');
  });

ticketRouter.post('/sendEmailAssigment', async (req, res) => {
    
    const { idTicket, useremail, worker} = req.body
    
    let ticket = await getTicketDetail(idTicket)
    let workerFind = await getUserByName(worker)
    
    
    try {
        await sendEmailWorkerAssigment( idTicket, ticket, useremail, workerFind);
    } catch (e) {
        console.log(e.message)
    }
    
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailAssigmentUser', async (req, res) => {
    const { idTicket, useremail, worker} = req.body
    
    let ticket = await getTicketDetail(idTicket)
    let workerFind = await getworkerByName(ticket)
    let useremailFind = ""

    if(useremail === ""){
        useremailFind = await getUserEmailByTicketID(idTicket)
    }else{
        useremailFind = useremail
    }

    try {
        await sendEmailWorkerAceptAssigment( ticket, useremailFind, workerFind);
    } catch (e) {
        console.log(e.message)
    }
    
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailComplete', async (req, res) => {
    const { idTicket, useremail, worker, detail, question, answer } = req.body
    
    let ticket = await getTicketDetail(idTicket)
    let workerFind = await getworkerByName(ticket)
    let onlyDetail = await getDetailOnly(ticket)
    

    try {
        await sendEmailUserComplete( ticket, useremail, workerFind, onlyDetail );
        await sendEmailWorkerComplete( ticket, useremail, workerFind, onlyDetail );
    } catch (e) {
        console.log(e.message)
    }
   
    res.send('Soporte creado exitosamente');

  });

ticketRouter.post('/sendEmailMoreInfo', async (req, res) => {
    const { idTicket, useremail, worker, detail, question } = req.body
    
    let ticket = await getTicketDetail(idTicket)
    let workerFind = await getworkerByName(ticket)

    try {
        await sendEmailInfoToUser( ticket, useremail, workerFind, detail, question);
    } catch (e) {
        console.log(e.message)
    }
  
    res.send('Soporte creado exitosamente');
});

ticketRouter.post('/sendEmailInfoUser', async (req, res) => {
    const { idTicket, useremail, worker, detail, question, answer } = req.body
    
    let ticket = await getTicketDetail(idTicket)
    let workerFind = await getworkerByName(ticket)
    let detailWithoutQuestion = await getDetailWithoutQuestion(ticket)
    let questionFind = await getLastQuestion(ticket)

    try {
        await sendEmailInfoToWorker( ticket, useremail, workerFind, detailWithoutQuestion, questionFind, answer);
    } catch (e) {
        console.log(e.message)
    }
   
    res.send('Soporte creado exitosamente');
});

ticketRouter.post('/sendEmailCloseTicket', async (req, res) => {
    const { idTicket, useremail, worker, detail, question, answer } = req.body
    
    let ticket = await getTicketDetail(idTicket)
    let workerFind = await getworkerByName(ticket)
    let onlyDetail = await getDetailOnly(ticket)
    

    try {
        await sendEmailUserFinish( ticket, useremail, workerFind, onlyDetail );
        await sendEmailWorkerFinish( ticket, useremail, workerFind, onlyDetail );
        
    } catch (e) {
        console.log(e.message)
    }
   
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailAdvertisement', async (req, res) => {
    
    const { title, time, user} = req.body

    let workerFind = await getUserByName(user)
    
    
    try {
        await sendEmailAdvertisement( title , time , workerFind);
    } catch (e) {
        console.log(e.message)
    }
    
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });


module.exports = ticketRouter;
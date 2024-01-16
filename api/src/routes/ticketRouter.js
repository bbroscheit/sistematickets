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
const sendEmail = require('./helpers/sendEmail');
const sendEmailWorker = require('./helpers/sendEmailWorker');
const sendEmailWorkerAssigment = require ('./helpers/sendEmailWorkerAssigment');
const sendEmailInfoToWorker = require('./helpers/sendEmailInfoToWorker');
const sendEmailWorkerComplete = require('./helpers/sendEmailWorkerComplete');
const sendEmailWorkerFinish = require( './helpers/sendEmailWorkerFinish')
const sendEmailNewTicket = require('./helpers/sendEmailNewTicket');
const getTicketsPendientes24 = require('./controllers/getTicketsPendientes24')
const getTicketByWorker = require('./controllers/getTicketByWorker')




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

ticketRouter.get( '/ticketsPendientes24' , async ( req, res ) => {
    
    try {
        let ticketPendiente = await getTicketsPendientes24();
        ticketPendiente ? res.status(200).json(ticketPendiente) : res.status(400).send("failure")
    } catch (e) {
        console.log( "error en ruta get ticketPendiente24" , e.message)
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

ticketRouter.post('/sendEmailNewTicket', async (req, res) => {
    const {email} = req.body
    
    // Envia notificación al usuario
    const usuarioEmail = email;
    const usuarioSubject = 'Nuevo soporte creado';
    const usuarioText = 'Su soporte ha sido creado con éxito.';
  
    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);

    const desarrolladorSubject = 'Nuevo soporte creado';
    const desarrolladorText = `el usuario ${email} ha creado un nuevo soporte`;
  
    await sendEmailNewTicket(desarrolladorSubject, desarrolladorText);


  
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailAssigment', async (req, res) => {
    const { idTicket, useremail, worker} = req.body
    let msj = idTicket !== undefined ? `Has sido asignado para trabajar en el soporte Nº ${idTicket}.` : "se te ha asignado un nuevo soporte"
    
    // Envia notificación al usuario
    const usuarioEmail = useremail;
    const usuarioSubject = `Soporte Asignado`;
    const usuarioText = `Su soporte le ha sido asignado a ${worker} y será resuelto el las siguientes 24Hs.`;
  
    await sendEmail( usuarioEmail, usuarioSubject, usuarioText);
  
    // Envia notificación al desarrollador
    const desarrolladorEmail = worker;
    const desarrolladorSubject = 'Nuevo soporte asignado';
    const desarrolladorText = msj ;
  
    await sendEmailWorkerAssigment( idTicket, desarrolladorEmail, desarrolladorSubject, desarrolladorText);
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailComplete', async (req, res) => {
    const { idTicket, useremail } = req.body

    let msj = idTicket !== undefined ? `El soporte Nº ${idTicket} ha sido cerrado por el desarrollador, por favor verificar y dar por completado` : `Tú soporte ha sido cerrado por el desarrollador, por favor verificar y dar por completado`
    let msjWorker = idTicket !== undefined ? `Has cerrado el soporte Nº ${idTicket} con exito.` : "El soporte fue cerrado exitosamente"
        
    // Envia notificación al usuario
    const usuarioEmail = useremail;
    const usuarioSubject = 'Soporte Cerrado';
    const usuarioText = msj
  
    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);
        console.log("ruta complete", idTicket)

        const id = idTicket;
        const desarrolladorSubject = 'Soporte Cerrado';
        const desarrolladorText = msjWorker ;
        // Envia notificación al desarrollador
        
        await sendEmailWorkerComplete( id, desarrolladorSubject, desarrolladorText);
   
        // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailMoreInfo', async (req, res) => {
    const { idTicket, useremail, worker } = req.body
    
    // Envia notificación al usuario
    const usuarioEmail = useremail;
    const usuarioSubject = 'Se solicita más información';
    const usuarioText = idTicket ? `El desarrollador ${worker} solicita más información sobre el soporte Nº ${idTicket}`:'Se solicita más información sobre el soporte requerido.';
  
    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);
  
    res.send('Soporte creado exitosamente');
});

ticketRouter.post('/sendEmailInfoUser', async (req, res) => {
    const { idTicket, useremail } = req.body
 
    // Envia notificación al desarrollador
    const user = useremail;
    const desarrolladorSubject = 'El Usuario a enviado mas información';
  
    await sendEmailInfoToWorker( idTicket, user , desarrolladorSubject );
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
});

  ticketRouter.post('/sendEmailCloseTicket', async (req, res) => {
    const { idTicket, useremail , worker } = req.body

    let msj = idTicket !== undefined ? `Has cerrado el soporte Nº ${idTicket} exitosamente` : ` Has cerrado el soporte exitosamente`
    let msjWorker = idTicket !== undefined ? `El usuario ha cerrado el soporte Nº ${idTicket} con exito.` : "El soporte fue cerrado exitosamente"
        
    // Envia notificación al usuario
    const usuarioEmail = useremail;
    const usuarioSubject = 'Soporte Cerrado';
    const usuarioText = msj

    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);
 
    // Envia notificación al desarrollador
    
    const desarrolladorSubject = 'El soporte fue cerrado por el usuario';
    const desarrolladorText = msjWorker;
  
    await sendEmailWorkerFinish( idTicket , desarrolladorSubject, desarrolladorText);
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

module.exports = ticketRouter;
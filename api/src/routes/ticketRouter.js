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
    
    console.log("body", req.body)
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
    // const {email} = req.body
    console.log("body", req.body)
    
    // Envia notificación al usuario
    const usuarioEmail = 'bernardo.broscheit@basani.com.ar';
    const usuarioSubject = 'Nuevo soporte creado';
    const usuarioText = 'Su soporte ha sido creado con éxito.';
  
    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);
  
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailAssigment', async (req, res) => {
    const { useremail, worker} = req.body
        
    // Envia notificación al usuario
    const usuarioEmail = useremail;
    const usuarioSubject = 'Soporte Asignado';
    const usuarioText = 'Su soporte ha sido asignado a un desarrollador';
  
    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);
  
    // Envia notificación al desarrollador
    const desarrolladorEmail = worker;
    const desarrolladorSubject = 'Nuevo soporte asignado';
    const desarrolladorText = 'Has sido asignado para trabajar en un nuevo soporte.';
  
    await sendEmailWorker(desarrolladorEmail, desarrolladorSubject, desarrolladorText);
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailComplete', async (req, res) => {
    const { useremail } = req.body
        
    // Envia notificación al usuario
    const usuarioEmail = useremail;
    const usuarioSubject = 'Soporte Cerrado';
    const usuarioText = 'Su soporte ha sido cerrado por el desarrollador, por favor verificar y dar por completado';
  
    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

ticketRouter.post('/sendEmailComplete', async (req, res) => {
    const { useremail } = req.body
        
    // Envia notificación al usuario
    const usuarioEmail = useremail;
    const usuarioSubject = 'Desarrollador solicita mas información';
    const usuarioText = 'El desarrollador solicita mas información para poder resolver su soporte';
  
    await sendEmail(usuarioEmail, usuarioSubject, usuarioText);
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

  ticketRouter.post('/sendEmailInfoUser', async (req, res) => {
    const { worker } = req.body
 
    // Envia notificación al desarrollador
    const desarrolladorEmail = worker;
    const desarrolladorSubject = 'El Usuario a enviado mas información';
    const desarrolladorText = 'El usuario a agreado mas información a su soporte.';
  
    await sendEmailWorker(desarrolladorEmail, desarrolladorSubject, desarrolladorText);
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

  ticketRouter.post('/sendEmailCloseTicket', async (req, res) => {
    const { worker } = req.body
 
    // Envia notificación al desarrollador
    const desarrolladorEmail = worker;
    const desarrolladorSubject = 'El soporte fue cerrado por el usuario';
    const desarrolladorText = 'El Soporte fue cerrado exitosamente.';
  
    await sendEmailWorker(desarrolladorEmail, desarrolladorSubject, desarrolladorText);
  
    // Respuesta al cliente
    res.send('Soporte creado exitosamente');
  });

module.exports = ticketRouter;
const { User, Ticket } = require("../../bd");
const nodemailer = require("nodemailer");

// Configuración del transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: "mail.basani.com.ar",
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: "sistemas@basani.com.ar",
    pass: "same7024",
  },
});

// Función para enviar correo electrónico
const sendEmailInfoToWorker = async (idTicket, user, desarrolladorSubject) => {
    let userWorker = {}
    let subject = desarrolladorSubject
    let text = ""

    let username = await User.findOne({
        where: { email : user}
    })

    if(username && idTicket){
        text = `el usuario ${username.firstname} ${username.lastname} aportó más información al soporte Nº ${idTicket}`
       
    }else{
        text = `el usuario aportó más información al soporte solicitado`
    }

    if(idTicket){
        try {
            let ticket = await Ticket.findOne({
                where: { id: idTicket },
            });

            if(ticket){
                userWorker = await User.findOne({ 
                    where:{ username : ticket.worker}
                })
            }  
        
        const to = userWorker.email;

        console.log("user.email" , userWorker.email)
  
        const info = await transporter.sendMail({
          from: "sistemas@basani.com.ar",
          to,
          subject,
          text,
        });
      
  
      console.log("Correo electrónico enviado:", userWorker.email);
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
    }
  }

    console.log("Correo electrónico enviado:", user.email);
  
  
  
  
};

module.exports = sendEmailInfoToWorker;
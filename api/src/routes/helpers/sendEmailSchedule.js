require("dotenv").config();
const {User} = require('../../bd');
const nodemailer = require("nodemailer");
const { MAIL_USER, MAIL_PASS, MAIL_PORT } = process.env;

// Configuración del transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: "mail.basani.com.ar",
  port: MAIL_PORT,
  secure: MAIL_PORT == 465, // true para 465, false para otros puertos
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  
});

// Función para enviar correo electrónico
const sendEmailSchedule = async ( detail, invited, startdateModify, starthour, finishhour ) => {
  try {
    for (let i = 1; i < invited.length; i++) {
        const [firstname, lastname] = invited[i].split(' ');

        let workerFind = await User.findOne({ 
            where: { 
              isdelete: false,
              firstname: firstname,
              lastname: lastname
            } 
          });

          if (workerFind) {
            // Enviar el correo si se encuentra el usuario
            const info = await transporter.sendMail({
              from: "mesadeayuda@basani.com.ar",
              to: workerFind.email, 
              subject: `Haz sido invitado a una reunión el ${startdateModify}`,
              html: `
                <p>Buenos días,</p>
                <p>Se ha creado una reunión para el ${startdateModify} a las ${starthour} Hs hasta las ${finishhour} Hs</strong> </p>
                <p>Título: <strong> ${detail}</strong> </p>
                <p>Por favor confirmar asistencia desde la App de Soportes</p>
                <div style="text-align: center;">
                  <p>Muchas gracias</p>
                  <p><strong>Mesa de Ayuda</strong></p>
                </div>
              `,
            });
        
    
    
    console.log("Correo electrónico enviado:", info.messageId);
        } else {
            console.log(`Usuario no encontrado para: ${invited[i]}`);
        }}
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};

module.exports = sendEmailSchedule;
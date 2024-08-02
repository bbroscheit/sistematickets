require("dotenv").config();

const nodemailer = require("nodemailer");
const { LOCALHOST, PORTFRONT, MAIL_USER, MAIL_PASS, MAIL_PORT } = process.env;

// Configuración del transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: "mail.basani.com.ar",
  port: MAIL_PORT,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

// Función para enviar correo electrónico
const sendEmailInfoToWorker = async (
  ticket,
  useremail,
  workerFind,
  detailWithoutQuestion,
  questionFind,
  answer) => {
  try {
    
    let allDetail = ticket.detail.split('\n').filter(oracion => oracion.trim() !== '');

    let detailFiltered = allDetail.slice(0, -2);
    
    const info = await transporter.sendMail({
      from: "mesadeayuda@basani.com.ar",
      to: workerFind[0].email,
      subject: `${ticket.user.firstname } ${ticket.user.lastname } agregó más Informacíon sobre el soporte N° ${ticket.id}`,
      html: `
        <p>Buenos días,</p>
        <p>el usuario ${ticket.user.firstname } ${ticket.user.lastname } más informacíon sobre el soporte N° <strong> ${ticket.id}</strong> </p>
        <p>Título : <strong> ${ticket.subject}</strong> </p>
        <p>Detalle : <strong> ${detailFiltered}</strong> </p>
        <p>Pregunta : <strong> ${questionFind}</strong></p>
        <p>Respuesta : <strong> ${answer}</strong></p>
        <p>Puedes ingresar nueva informacíon desde la App Soporte Basani SA haciendo click <a href="http://${LOCALHOST}:${PORTFRONT}/soportes/${ticket.id}"><strong>aqui</strong></a>.</p>
        <div style="text-align: center;">
          <p>Muchas gracias</p>
          <p><strong>Mesa de Ayuda</strong></p>
        </div>
        `,
    });

    console.log("Correo electrónico enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
   
};

module.exports = sendEmailInfoToWorker;
require("dotenv").config();

const nodemailer = require("nodemailer");
const { LOCALHOST, PORTFRONT, MAIL_USER, MAIL_PASS } = process.env;

// Configuración del transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: "mail.basani.com.ar",
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

// Función para enviar correo electrónico
const sendEmailWorkerComplete = async (
  ticket,
  useremail,
  workerFind,
  onlyDetail,
  ) => {
  try {
    
    const info = await transporter.sendMail({
      from: "mesadeayuda@basani.com.ar",
      to: workerFind[0].email,
      subject: `Has resuelto el soporte N° ${ticket.id}`,
      html: `
        <p>Buenos días,</p>
        <p>Has terminado el desarrollo el soporte N° <strong> ${ticket.id}</strong> </p>
        <p>Título : <strong> ${ticket.subject}</strong> </p>
        <p>Detalle : <strong> ${onlyDetail}</strong> </p>
        <p>Se le ha avisado al usuario que compruebe el resultado y cierre el respectivo soporte.</p>
        <p>Puedes hacer un seguimiento desde la App Soporte Basani SA haciendo click <a href="http://${LOCALHOST}:${PORTFRONT}/soportes/${ticket.id}"><strong>aqui</strong></a>.</p>
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

module.exports = sendEmailWorkerComplete;
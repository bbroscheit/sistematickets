require("dotenv").config();

const nodemailer = require("nodemailer");
const { LOCALHOST, PORTFRONT } = process.env;

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
const sendEmailWorkerFinish = async (
  ticket,
  useremail,
  workerFind,
  onlyDetail,
  ) => {
  try {
    
    const info = await transporter.sendMail({
      from: "mesadeayuda@basani.com.ar",
      to: workerFind[0].email,
      subject: `El usuario a cerrado soporte N° ${ticket.id}`,
      html: `
        <p>Buenos días,</p>
        <p>El usuario a cerrado soporte N° <strong> ${ticket.id}</strong> </p>
        <p>Título : <strong> ${ticket.subject}</strong> </p>
        <p>Detalle : <strong> ${onlyDetail}</strong> </p>
        <p>Puedes volver a consultarlo desde la App Soporte Basani SA haciendo click <a href="http://${LOCALHOST}:${PORTFRONT}/soportes/${ticket.id}"><strong>aqui</strong></a>.</p>
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

module.exports = sendEmailWorkerFinish;
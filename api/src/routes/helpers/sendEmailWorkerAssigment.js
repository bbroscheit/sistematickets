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
const sendEmailWorkerAssigment = async (
  idTicket,
  ticket,
  useremail,
  workerFind
) => {
  try {
    console.log(ticket.user)
    const info = await transporter.sendMail({
      from: "mesadeayuda@basani.com.ar",
      to: workerFind[0].email,
      subject: `Se te ha asignado el soporte N° ${idTicket}`,
      html: `
        <p>Buenos días,</p>
        <p>Se ha asignado el soporte N° <strong> ${idTicket}</strong> creado por el usuario ${ticket.user.firstname} ${ticket.user.lastname}</p>
        <p>Título : <strong> ${ticket.subject}</strong> </p>
        <p>Detalle : <strong> ${ticket.detail}</strong> </p>
        <p>Puedes ingresar al mismo desde la App Soporte Basani SA haciendo click <a href="http://${LOCALHOST}:${PORTFRONT}/soportes/${idTicket}"><strong>aqui</strong></a>.</p>
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

module.exports = sendEmailWorkerAssigment;

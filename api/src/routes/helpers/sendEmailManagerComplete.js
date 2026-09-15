require('dotenv').config();
const nodemailer = require('nodemailer');
const { LOCALHOST, PORTFRONT, MAIL_USER, MAIL_PASS, MAIL_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: 'mail.basani.com.ar',
  port: MAIL_PORT,
  secure: true,
  auth: { user: MAIL_USER, pass: MAIL_PASS },
});

const sendEmailManagerComplete = async (ticket, managerEmail, workerFind, onlyDetail) => {
  try {
    await transporter.sendMail({
      from: 'mesadeayuda@basani.com.ar',
      to: managerEmail,
      subject: `Se resolvió el soporte N° ${ticket.id} de ${ticket.user?.firstname} ${ticket.user?.lastname}`,
      html: `
        <p>Buenos días,</p>
        <p>Le informamos que se ha resuelto el soporte N° <strong>${ticket.id}</strong> de su empleado <strong>${ticket.user?.firstname} ${ticket.user?.lastname}</strong>.</p>
        <p>Título: <strong>${ticket.subject}</strong></p>
        <p>Detalle: <strong>${onlyDetail}</strong></p>
        <p>Puede ver el soporte haciendo click <a href="http://${LOCALHOST}:${PORTFRONT}/soportes/${ticket.id}"><strong>aquí</strong></a>.</p>
        <div style="text-align: center;">
          <p>Muchas gracias</p>
          <p><strong>Mesa de Ayuda</strong></p>
        </div>
      `,
    });
    console.log('Correo a jefe enviado (soporte completado)');
  } catch (error) {
    console.error('Error al enviar correo a jefe (soporte completado):', error);
  }
};

module.exports = sendEmailManagerComplete;

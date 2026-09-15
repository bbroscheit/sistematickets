require('dotenv').config();
const nodemailer = require('nodemailer');
const { LOCALHOST, PORTFRONT, MAIL_USER, MAIL_PASS, MAIL_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: 'mail.basani.com.ar',
  port: MAIL_PORT,
  secure: true,
  auth: { user: MAIL_USER, pass: MAIL_PASS },
});

const sendEmailManagerNewTicket = async (findTicket, managerEmail) => {
  try {
    await transporter.sendMail({
      from: 'mesadeayuda@basani.com.ar',
      to: managerEmail,
      subject: `${findTicket.user.firstname} ${findTicket.user.lastname} creó el soporte N° ${findTicket.id}`,
      html: `
        <p>Buenos días,</p>
        <p>Le informamos que su empleado <strong>${findTicket.user.firstname} ${findTicket.user.lastname}</strong> ha creado el soporte N° <strong>${findTicket.id}</strong>.</p>
        <p>Título: <strong>${findTicket.subject}</strong></p>
        <p>Detalle: <strong>${findTicket.detail}</strong></p>
        <p>Puede hacer el seguimiento haciendo click <a href="http://${LOCALHOST}:${PORTFRONT}/soportes/${findTicket.id}"><strong>aquí</strong></a>.</p>
        <div style="text-align: center;">
          <p>Muchas gracias</p>
          <p><strong>Mesa de Ayuda</strong></p>
        </div>
      `,
    });
    console.log('Correo a jefe enviado (nuevo soporte)');
  } catch (error) {
    console.error('Error al enviar correo a jefe (nuevo soporte):', error);
  }
};

module.exports = sendEmailManagerNewTicket;

const nodemailer = require('nodemailer');

// Configuración del transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: 'mail.basani.com.ar',
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: 'sistemas@basani.com.ar',
    pass: 'same7024',
  },
});

// Función para enviar correo electrónico
const sendEmail = async (to, subject, text) => {
  try {
    
    const info = await transporter.sendMail({
      from: 'sistemas@basani.com.ar',
      to,
      subject,
      text,
    });

    console.log('Correo electrónico enviado:', info.messageId);
    
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

module.exports = sendEmail;
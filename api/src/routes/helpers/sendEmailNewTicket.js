// const { User, Sector } = require("../../bd");
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
const sendEmailNewTicket = async (findTicket) => {
  try {
    
      const info = await transporter.sendMail({
        from: 'mesadeayuda@basani.com.ar',
        to: "bernardo.broscheit@basani.com.ar",
        subject: `Se ha creado el soporte N° ${findTicket.id}`,
        html: `
          <p>Buenos días,</p>
          <p>Se ha creado el soporte N° <strong> ${findTicket.id}</strong> </p>
          <p>Título : <strong> ${findTicket.subject}</strong> </p>
          <p>Detalle : <strong> ${findTicket.detail}</strong> </p>
          <div style="text-align: center;">
            <p>Muchas gracias</p>
            <p><strong>Mesa de Ayuda</strong></p>
          </div>
          `,
      });

      console.log('Correo electrónico enviado:', info.messageId);
   
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};

module.exports = sendEmailNewTicket;

// text : 
//         ` <p>Buenos días,</p>
//           <p>El departamento de sistemas le informa que su soporte se ha registrado con éxito.</p>
//           <p><strong>Su número de ticket es el: ${findTicket.id}</strong></p>
//           <p>Recuerde que podrá realizar el seguimiento del estado de su ticket desde la App Soporte Basani SA - Menú: “Consulta de Soportes”.</p>
//           <p>Muchas gracias</p>
//           <p>Departamento de Sistemas</p>
//       `,
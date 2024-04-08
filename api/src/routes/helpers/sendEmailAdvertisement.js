require("dotenv").config();

const nodemailer = require("nodemailer");
const { LOCALHOST, PORTFRONT } = process.env;

// Configuración del transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: "mail.basani.com.ar",
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: "mesadeayuda@basani.com.ar",
    pass: "Aduy7024$",
  },
});

// Función para enviar correo electrónico
const sendEmailAdvertisement = async (
  title,
  time,
  workerFind
) => {
  try {
    const info = await transporter.sendMail({
      from: "mesadeayuda@basani.com.ar",
      to: workerFind[0].email,
      subject: `Tienes soportes pendientes de accíon`,
      html: `
        <p>Buenos días,</p>
        <p>Notamos que tienes ${title} con más de ${time} Hs </p>
        <p>Por favor proceda a regularizar la situacíon </p>
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

module.exports = sendEmailAdvertisement;
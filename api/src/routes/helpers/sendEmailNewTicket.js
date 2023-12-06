const { User, Sector } = require("../../bd");
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
const sendEmailNewTicket = async (desarrolladorSubject, desarrolladorText) => {
  const to = [];
  const subject = desarrolladorSubject;
  const text = desarrolladorText;

  const sistemasSector = await Sector.findOne({
    where: { sectorname: "Sistemas" },
    include: User, // Incluye la asociación con User
  });

  if (!sistemasSector) {
    console.log("Sector 'Sistemas' no encontrado.");
    return;
  }

  // Accede a la propiedad 'Users' del sector para obtener los usuarios
  const usersInSistemas = sistemasSector.users;

  const emailsInSistemas = usersInSistemas.map((user) => user.email);

  try {
    for (let i = 0; i < emailsInSistemas.length; i++) {
      const info = await transporter.sendMail({
        from: "sistemas@basani.com.ar",
        to: emailsInSistemas[i],
        subject,
        text,
      });

      console.log("Correo electrónico enviado:", info.messageId);
    }
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};

module.exports = sendEmailNewTicket;

const { User, Ticket } = require("../../bd");
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
const sendEmail = async (id, to, subject, text) => {
  if(id){
    try {
      let ticket = await Ticket.findOne({
        where: { id : id },
      });
  
      if(ticket){
        let user = await User.findOne({
          where: { username: ticket.worker },
        });
        
        const to = user.email;

        console.log("user.email" , user.email)
  
        // const info = await transporter.sendMail({
        //   from: "sistemas@basani.com.ar",
        //   to,
        //   subject,
        //   text,
        // });
      }
  
      console.log("Correo electrónico enviado:", user.email);
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
    }
  }else{
    try {
    let user = await User.findOne({
      where: { username: to },
    });

    if(user && user.email){
      
      const to = user.email;

      const info = await transporter.sendMail({
        from: "sistemas@basani.com.ar",
        to,
        subject,
        text,
      });
    }

    console.log("Correo electrónico enviado:", user.email);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
  }
  
  
};

module.exports = sendEmail;

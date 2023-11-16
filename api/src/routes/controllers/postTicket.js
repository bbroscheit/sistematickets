const { Ticket, User } = require('../../bd');
const fs = require('fs');
const path = require('path');

const postTicket = async (state, worker, subject, detail, answer, userresolved, user, files) => {
    console.log("file", files)
    console.log("body", state, worker, subject, detail, answer, userresolved, user)

    try {
        // Crear un nombre único para la carpeta usando el ID del ticket
        const ticketId = (await Ticket.create()).id;
        const folderName = `ticket_${ticketId}`;

       // Ruta donde se guardarán los archivos en la carpeta "documents"
       const documentsFolderPath = 'C:\\Users\\broscheitcb\\Documents';

       const folderPath = path.join(documentsFolderPath, folderName);

        // Crear la carpeta si no existe
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }


        // Mover archivos con el prefijo "new_" desde la carpeta "uploads" a la carpeta del ticket
        const uploadFolderPath = path.join(__dirname, '../../../../uploads'); // Ruta a la carpeta "uploads"
        const filesWithPrefix = fs.readdirSync(uploadFolderPath).filter(file => file.startsWith('new_'));

        for (const filename of filesWithPrefix) {
            const sourcePath = path.join(uploadFolderPath, filename);
            const destinationPath = path.join(folderPath, filename);

            // Mover el archivo a la carpeta específica del ticket
            fs.renameSync(sourcePath, destinationPath);
        }

        // Actualiza el registro en la base de datos

        let setTicket = await Ticket.findByPk(ticketId)
        
        
        if(user){
            let setUser = await User.findOne({
                where:{username: user}
            })
            if(setUser){
                await setTicket.setUser();
                await setTicket.setUser(setUser);
            }
        }
    
        const newTicket =  await setTicket.update({
            state : state, 
            worker : worker, 
            subject : subject, 
            detail : detail, 
            answer : answer,
            userresolved: userresolved
        })
    
        return newTicket

    } catch (e) {
        console.log("Error en controller postTicket", e.message);
        throw e;
    }
};

module.exports = postTicket;









const { Ticket, User } = require('../../bd');
const fs = require('fs');
const path = require('path');

const postTicket = async (state, worker, subject, detail, answer, userresolved, user, files) => {
    
    
    try {
        // Creo el ticket vacio para tener el ID que le va a dar nombre a la carpeta
        const ticketId = (await Ticket.create()).id;
        const folderName = `ticket_${ticketId}`;

        const formattedNewDetail = `${detail}\n\n`;

        const folderPath = path.join(__dirname, '../../../../client/public', folderName);

        // Crear la carpeta si no existe
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }


        // Mueve todos los archivos con el prefijo "new_" desde la carpeta "uploads" a la carpeta del ticket
        const uploadFolderPath = path.join(__dirname, '../../../../client/public');

              
        const filesWithPrefix = fs.readdirSync(uploadFolderPath).filter(file => file.startsWith('new_'));

        const filesArray = [];

        for (const filename of filesWithPrefix) {

            const sourcePath = path.join(uploadFolderPath, filename);
            const destinationPath = path.join(folderPath, filename);

            fs.renameSync(sourcePath, destinationPath);

            filesArray.push("/"+folderName+"/"+filename);

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
            detail : formattedNewDetail, 
            answer : answer,
            files: filesArray,
            userresolved: userresolved
        })
        
        return newTicket

    } catch (e) {
        console.log("Error en controller postTicket", e.message);
        throw e;
    }
};

module.exports = postTicket;









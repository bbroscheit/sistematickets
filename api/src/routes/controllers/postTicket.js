require('dotenv').config();

const { Ticket, User } = require('../../bd');
const fs = require('fs');
const path = require('path');
const saveInDropbox = require('../controllers/saveInDropbox');
const getSharedLink = require('../controllers/getSharedLink');

const { DEST_FILES} = process.env

const postTicket = async (state, worker, subject, detail, answer, userresolved, user, files) => {
    // console.log("file", files)
    console.log("body", state, worker, subject, detail, answer, userresolved, user)

    try {
        // Creo el ticket vacio para tener el ID que le va a dar nombre a la carpeta
        const ticketId = (await Ticket.create()).id;
        const folderName = `ticket_${ticketId}`;

        // Ruta donde se guardan los archivos en la carpeta "documents", pero ver donde lo guardamos cuando estemos en produccion
        const documentsFolderPath = path.join(DEST_FILES);
        
        const folderPath = path.join(__dirname, '../../../../public', folderName);

        // Crear la carpeta si no existe
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }


        // Mueve todos los archivos con el prefijo "new_" desde la carpeta "uploads" a la carpeta del ticket
        const uploadFolderPath = path.join(__dirname, '../../../../public/uploads');
        const filesWithPrefix = fs.readdirSync(uploadFolderPath).filter(file => file.startsWith('new_'));

        const filesArray = [];

        for (const filename of filesWithPrefix) {

            const sourcePath = path.join(uploadFolderPath, filename);
            const destinationPath = path.join('/', filename);

            // Mover el archivo a la carpeta específica del ticket
            // await saveInDropbox(files);

            // const sharedLink = await getSharedLink(destinationPath);
            
            // filesArray.push(sharedLink);
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
            files: filesArray,
            userresolved: userresolved
        })
        
        console.log("newticket", newTicket);

        return newTicket

    } catch (e) {
        console.log("Error en controller postTicket", e.message);
        throw e;
    }
};

module.exports = postTicket;









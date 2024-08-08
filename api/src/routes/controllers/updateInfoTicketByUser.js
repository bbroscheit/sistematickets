const { Ticket } = require('../../bd')
const fs = require('fs').promises;
const path = require('path');
const { TELEGRAMCHATID } = process.env
const sendTelegramMessage = require('../helpers/sendTelegramMessage')

const updateInfoTicketByuser = async (id, answer) => {
    try {
        // Obtener el ticket actual
        const existingTicket = await Ticket.findByPk(id);

        if (!existingTicket) {
            throw new Error('Ticket no encontrado');
        }

        // Obtener el valor actual de detail
        const currentDetail = existingTicket.detail || '';

        // Agrega un salto de linea 
        const formattedNewInfo = `\n${answer}\n`;

        // Concatenar el nuevo contenido con el valor actual de detail
        const updatedDetail = currentDetail + formattedNewInfo;

        const updatedFiles = existingTicket.files ? [...existingTicket.files] : [];
            const folderName = `ticket_${existingTicket.id}`;
            const folderPath = path.join(__dirname, '../../../../client/public', folderName);
            const uploadFolderPath = path.join(__dirname, '../../../../client/public');
            const filesWithPrefix = (await fs.readdir(uploadFolderPath)).filter(file => file.startsWith('new_'));

        // Crear la carpeta si no existe
        try {
            await fs.mkdir(folderPath, { recursive: true });
        } catch (err) {
            console.error(`Error al crear la carpeta ${folderPath}`, err);
            throw err;
        }

        for (const filename of filesWithPrefix) {
            const sourcePath = path.join(uploadFolderPath, filename);
            const destinationPath = path.join(folderPath, filename);

        try {
            await fs.rename(sourcePath, destinationPath);
            updatedFiles.push(`/${folderName}/${filename}`);
        } catch (err) {
            console.error(`Error al mover el archivo ${filename}`, err);
            throw err;
        }}

        if(updatedFiles){
            existingTicket.files = updatedFiles;
        } 


        // Actualizar el ticket con el nuevo detail
        let setTicket = await existingTicket.update({ 
            detail: updatedDetail, 
            state: "Desarrollo" 
        });

        setTicket = await existingTicket.update({
            files: existingTicket.files
        });

        if(setTicket){
            const telegramChatId = TELEGRAMCHATID;
            const telegramMessage = `${existingTicket.worker} han contestado tu consulta en el ticket N° ${id}`;
            await sendTelegramMessage(telegramChatId, telegramMessage);
        }

    return setTicket;
} catch (error) {
    console.error("Error en updateInfoTicket:", error.message);
    throw error; 
}}

module.exports= updateInfoTicketByuser
const { Ticket } = require('../../bd')
const fs = require('fs');
const path = require('path');

const updateInfoTicket = async (id, info, files) => {

    // Obtener el ticket actual
    const existingTicket = await Ticket.findByPk(id);

    if (!existingTicket) {
        throw new Error('Ticket no encontrado');
    }

    // Obtener el valor actual de detail
    const currentDetail = existingTicket.detail || '';

    // Agrega un salto de linea
    const formattedNewInfo = `\n${info}\n`;

    // Concatenar el nuevo contenido con el valor actual de detail
    const updatedDetail = currentDetail + formattedNewInfo;

    // const updatedFiles = existingTicket.files || [];
    // updatedFiles.push(files);

    const updatedFiles = existingTicket.files || [];
    const folderName = `ticket_${existingTicket.id}`;
    
    const folderPath = path.join(__dirname, '../../../../client/public', folderName);
    const uploadFolderPath = path.join(__dirname, '../../../../client/public');
    const filesWithPrefix = fs.readdirSync(uploadFolderPath).filter(file => file.startsWith('new_'));
    
        for (const filename of filesWithPrefix) {

            const sourcePath = path.join(uploadFolderPath, filename);
            const destinationPath = path.join(folderPath, filename);

            fs.renameSync(sourcePath, destinationPath);
            
            updatedFiles.push("/"+folderName+"/"+filename);
            
        }
    
    console.log("ticket", existingTicket)
    // console.log("updatefiles", updatedFiles)
    // Actualizar el ticket con el nuevo detail
    const setTicket = await existingTicket.update({
        detail: updatedDetail,
        // files: updatedFiles,
        state: "Informacion" });

    return setTicket;

}

module.exports= updateInfoTicket
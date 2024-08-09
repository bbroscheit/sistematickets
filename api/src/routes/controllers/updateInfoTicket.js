const { Ticket } = require('../../bd');
const fs = require('fs').promises;
const path = require('path');

const updateInfoTicket = async (id, info, files) => {
    try {
        // Obtener el ticket actual
        const existingTicket = await Ticket.findByPk(id);

        if (!existingTicket) {
            throw new Error('Ticket no encontrado');
        }

        // Obtener el valor actual de detail
        const currentDetail = existingTicket.detail || '';

        const now = new Date();
        const formattedDate = now.toLocaleDateString(); // Formato de fecha, ajusta según necesidades
        const formattedTime = now.toLocaleTimeString(); // Hora actual, opcional

        // Agrega un salto de línea
        const formattedNewInfo = `- ${existingTicket.worker} - ${formattedDate} ${formattedTime}\n- ${info}\n\n`;

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
            }
        }

        if(updatedFiles){
            existingTicket.files = updatedFiles;
        } 
        
        // Actualizar el ticket con el nuevo detalle y archivos
        let setTicket = await existingTicket.update({
            detail: updatedDetail,
            state: 'Informacion'
        });

        setTicket = await existingTicket.update({
            files: existingTicket.files
        });

        return setTicket;
    } catch (error) {
        console.error("Error en updateInfoTicket:", error.message);
        throw error; 
    }
};

module.exports = updateInfoTicket;
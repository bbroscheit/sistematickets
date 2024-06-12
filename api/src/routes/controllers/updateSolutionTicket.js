const { Ticket, sequelize } = require('../../bd')
const fs = require('fs').promises;
const path = require('path');

const updateSolutionTicket = async (id, solution) => {
  try {

    const date = new Date()
    // Obtener el ticket actual
    const existingTicket = await Ticket.findByPk(id);

    if (!existingTicket) {
        throw new Error('Ticket no encontrado');
    }

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
    let setTicket = await existingTicket.update( 
        { answer: solution , 
          state: "Completado" , 
          finishdate: sequelize.literal('CURRENT_TIMESTAMP')},
        { where: { id:id } } 
    );

    setTicket = await existingTicket.update({
        files: existingTicket.files
    });

  return setTicket;
} catch (error) {
  console.error("Error en updateInfoTicket:", error.message);
  throw error; 
}}
    
module.exports= updateSolutionTicket
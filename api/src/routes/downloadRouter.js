const path = require ( 'path' );
const downloadRouter = require("express").Router()

downloadRouter.get("/download/:fileName" , async (req, res) => {
    
    const nombreArchivo = req.params.fileName;
    // const rutaArchivo = path.join(__dirname, '../../../public/ticket_109', nombreArchivo);
    const rutaArchivo = path.join('../public', 'ticket_109', nombreArchivo);
    // public\ticket_109\new_borrado de cheque.jpg
    console.log("ruta del archivo" , rutaArchivo)

   res.download(rutaArchivo, (error) => {
        if (error) {
            console.log('Error al descargar el archivo:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
    
})

module.exports = downloadRouter
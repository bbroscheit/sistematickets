const multer = require ('multer')

// middleware de multer para subir archivos (tickets, proyectos, etc). los
// deja todos con el prefijo "new_" en client/public, y despues cada
// controller (postTicket.js, postNewProject.js, etc) los mueve a su
// carpeta final usando ese prefijo para identificarlos
function uploadFile(){
    const storage = multer.diskStorage({
      destination: '../client/public', //lugar donde queremos que se guarden los archivos
      filename: function (_req, file, cb) {
        cb(null, "new_" + file.originalname) // nombre con el que se guardan los archivos
      }
    })
  
    // const upload = multer({ storage: storage }).single('files')
    const upload = multer({ storage: storage }).array('files', 10)
    
    

  return upload
}

module.exports = uploadFile;


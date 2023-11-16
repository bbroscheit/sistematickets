const multer = require ('multer')

function uploadFile(){
    const storage = multer.diskStorage({
      destination: '../uploads', //lugar donde queremos que se guarden los archivos
      filename: function (_req, file, cb) {
        cb(null, "new_" + file.originalname) // nombre con el que se guardan los archivos
      }
    })
  
    const upload = multer({ storage: storage }).single('files')
  
  return upload
}

module.exports = uploadFile;


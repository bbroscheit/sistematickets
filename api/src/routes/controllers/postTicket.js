// const { Ticket, User } = require('../../bd')

// const postTicket = async (state, worker, subject, detail, answer = "Sin resolucion", files , userresolved, user, created, startdate, finishdate, randomdate) => {
    
//     try {
//         let newTicket = await Ticket.create({
//             state, 
//             worker, 
//             subject, 
//             detail, 
//             answer,
//             files,
//             userresolved,
//             created, 
//             startdate, 
//             finishdate, 
//             randomdate
//         })

//         if (user) {
//             let userFinder = await User.findOne({
//               where: {
//                 username: user,
//               },
//             });
//             if (userFinder) {
//              await newTicket.setUser(userFinder.id);
//             }
//           }

//         return newTicket
        
//     } catch (e) {
//         console.log("error en controller postTicket" , e.message)
//     }
// }

// module.exports = postTicket

// const { Ticket, User } = require('../../bd');
// const fs = require('fs');
// const path = require('path');

// const postTicket = async (state, worker, subject, detail, answer = "Sin resolución", files, userresolved, user, created, startdate, finishdate, randomdate) => {
//     try {
//         // Crear un nombre único para la carpeta usando el ID del ticket
//         const ticketId = (await Ticket.create()).id;
//         const folderName = `ticket_${ticketId}`;

//        // Ruta donde se guardarán los archivos en la carpeta "documents"
//        const documentsFolderPath = 'C:\\Users\\broscheitcb\\Documents';

//        const folderPath = path.join(documentsFolderPath, folderName);

//         // Crear la carpeta si no existe
//         if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath);
//         }

//         // Guardar los archivos en la carpeta específica
//         const uploadedFiles = [];

//         if (files && files.length > 0) {
//             for (const filePath of files) {
//                 const filename = path.basename(filePath);

//                 // Ruta donde se guardará el archivo en la carpeta específica
//                 const destinationPath = path.join(folderPath, filename);

//                 // Mover el archivo a la carpeta específica
//                 fs.renameSync(filePath, destinationPath);

//                 // Agregar la ruta del archivo a la lista de archivos guardados
//                 uploadedFiles.push(destinationPath);
//             }
//         }

//         // Crear el registro en la base de datos
//         const newTicket = await Ticket.create({
//             state,
//             worker,
//             subject,
//             detail,
//             answer,
//             files: uploadedFiles,
//             userresolved,
//             created,
//             startdate,
//             finishdate,
//             randomdate
//         });

//         // Asociar el usuario al ticket
//         if (user) {
//             const userFinder = await User.findOne({
//                 where: {
//                     username: user,
//                 },
//             });
//             if (userFinder) {
//                 await newTicket.setUser(userFinder.id);
//             }
//         }

//         return newTicket;
//     } catch (e) {
//         console.log("Error en controller postTicket", e.message);
//         throw e;
//     }
// };

// module.exports = postTicket;

const { Ticket, User } = require('../../bd');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ticketId = req.body.ticketId || 'dummyId';
        const folderName = `ticket_${ticketId}`;
        const documentsFolderPath = 'C:\\Users\\broscheitcb\\Documents';
        const folderPath = path.join(documentsFolderPath, folderName);

        // Crear la carpeta si no existe
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).array('files', 10);

// Función para manejar la carga de archivos y otros datos del ticket
const postTicket = async (req, state, worker, subject, detail, answer = "Sin resolución", userresolved, user, created, startdate, finishdate, randomdate) => {
  try {

        const uploadMiddleware = upload.array('files', 10);
        // Manejar la carga de archivos
        await new Promise((resolve, reject) => {
          uploadMiddleware(req, null, async err => {
              if (err) {
                  console.error("Error al cargar archivos:", err);
                  reject(err);
              }

              resolve();
          });
      });

        // Obtener las rutas de los archivos cargados
        const uploadedFiles = req.files.map(file => {
          return {
              originalname: file.originalname,
              path: file.path,
          };
      });
        // Crear el registro en la base de datos
        const newTicket = await Ticket.create({
            state,
            worker,
            subject,
            detail,
            answer,
            files: uploadedFiles,
            userresolved,
            created,
            startdate,
            finishdate,
            randomdate,
        });

        // Asociar el usuario al ticket
        if (user) {
            const userFinder = await User.findOne({
                where: {
                    username: user,
                },
            });
            if (userFinder) {
                await newTicket.setUser(userFinder.id);
            }
        }

        return newTicket;
    } catch (error) {
        console.log("Error en controller postTicket", error.message);
        throw error;
    }
};

module.exports = postTicket;





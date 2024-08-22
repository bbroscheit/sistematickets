const { Newproject, User, Formproject } = require("../../bd");
const fs = require('fs');
const path = require('path');

function convertFromStringToDate(finishDate) {
  let datePieces = finishDate.split("-");
  
  return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]))
}



const postNewProject = async (
  state,
  projectname,
  projectdetail,
  requirer,
  worker,
  finishdate, 
  files
) => {
  try {

    // Creamos el projecto con todos los datos recibidos menos el archivo y los users
    let newProject = await Newproject.create({state, projectname, projectdetail, finishdate});

    const folderName = `Proyecto_${newProject.projectname}`;

    const folderPath = path.join(__dirname, '../../../../client/public/Proyectos', folderName);

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
        const destinationPath = path.join(folderPath, filename)

        fs.renameSync(sourcePath, destinationPath);

        filesArray.push("/"+folderName+"/"+filename);

    }

    let newForm = await Formproject.create({files: filesArray});

    if (requirer) {
      let require = await User.findOne({
        where: [{ isdelete: false }, { username: requirer }],
      });
      
      if (require) {
        await newProject.addUser(require.id);
      }
    }

    if (worker && worker.length > 0) {
      // Crear una lista para almacenar los IDs de los trabajadores
      const workerIds = [];

      for (let i = 0; i < worker.length; i++) {
        let workerFind = await User.findOne({
          where: [{ isdelete: false }, { username: worker[i] }],
        });
        
        if (workerFind) {
          workerIds.push(workerFind.id);
        }
      }

      // Agregar todos los trabajadores al proyecto
      await newProject.addUsers(workerIds);
    }

    if(newForm){
      await newProject.setFormproject(newForm.id)
    }

    return newProject;

  } catch (e) {
    console.log("error en postNewProject", e.message);
  }
};

module.exports = postNewProject;
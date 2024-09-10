const { Newproject, User, Formproject } = require("../../bd");
const fs = require('fs');
const path = require('path');

function convertFromStringToDate(finishDate) {
  let datePieces = finishDate.split("-");
  
  return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]))
}

const updateNewProject = async (
    idProject,
    projectname,
    projectdetail,
    requirer,
    worker,
    finishdate, 
    files
) => {
  try {

    // Creamos el projecto con todos los datos recibidos menos el archivo y los users
    let updateProject = await Newproject.update({
        projectname, 
        projectdetail, 
        finishdate, 
    },{
        where:{id:idProject}
    })

    const folderName = `Proyecto_${updateProject.projectname}`;

    const folderPath = path.join(__dirname, '../../../../client/public/Proyectos', folderName);

    // Crear la carpeta si no existe
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }


    // Mueve todos los archivos con el prefijo "new_" desde la carpeta "uploads" a la carpeta del proyecto
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

    let setProject = await Newproject.findByPk( idProject , {
        include:[{
            model:User,
        },{
            model:Formproject
        }]
    })

    // Actualizamos los usuarios vinculados al proyecto
    if ( requirer || (worker && worker.length > 0)) {
      // Creamos un array para los nuevos usuarios (requirer y workers) y separamos a requirer que viene en formato "nombre + apellido" y en la BD estan guardados por separado
      let allUserIds = [];
      let [name, surname] = requirer.split(" ")
      
      // Buscamos y añadimos al `requirer` si existe
      if (requirer) {
        if(surname) {
          let require = await User.findOne({
          where: { isdelete: false, firstname: name , lastname : surname }
        });
          if (require) {
            await setProject.setUsers(require.id);
            
          }
        }else{
          let require = await User.findOne({
            where: { isdelete: false, username : requirer }
          });
          if (require) {
            await setProject.setUsers(require.id);
            
          }
        }
      }

      // Buscamos y añadimos a los `workers` si existen
      if (worker && worker.length > 0) {
        let workerNames = worker.split(",")
        for (let i = 0; i < workerNames.length; i++) {
          let workerFind = await User.findOne({ where: { isdelete: false, username: workerNames[i] }});
          if (workerFind) { allUserIds.push(workerFind.id);}
        }
      }

      // Sobrescribimos todos los usuarios del proyecto con el nuevo array
      await setProject.addUsers(allUserIds);  
    }

    if(newForm && newForm !== undefined){
      await setProject.setFormproject(newForm.id)
    }

    console.log("llegue al final del controller")
    return setProject;

  } catch (e) {
    console.log("error en updateProject", e.message);
  }
};

module.exports = updateNewProject;
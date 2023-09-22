const { Project, User } = require("../../bd");


function convertFromStringToDate(finishDate) {
  let datePieces = finishDate.split("-");
  
  return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]))
}



const postProject = async (
  state,
  projectname,
  projectdetail,
  requirer,
  worker,
  finishdate
) => {
  try {
    
    let newProject = await Project.create({state, projectname, projectdetail, finishdate});
    
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

    
    
    return newProject;
  } catch (e) {
    console.log("error en postProject", e.message);
  }
};

module.exports = postProject;

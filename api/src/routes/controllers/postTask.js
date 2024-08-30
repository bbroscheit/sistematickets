const {  Newproject, Newtask, User, sequelize } = require("../../bd");

const postTask = async (
    idProject, state, taskdetail, taskfinishdate, worker, taskdate = sequelize.literal('CURRENT_TIMESTAMP')
) => {

  console.log( "task", taskfinishdate)
    try {

      let newTask = await Newtask.create({
        state, taskdetail, taskdate, taskfinishdate
      });

      let projectFind = await Newproject.findOne({
          where: {  id: idProject },
      });
      
      
      let workerFind = await User.findOne({
          where: {  id: worker },
      });

      if (projectFind) {
        await newTask.setNewproject(projectFind)
        await newTask.addUser(workerFind.id)
      }
     
    return newTask;

  } catch (e) {
    console.log(" error en controller postTask ", e.message);
  }
};

module.exports = postTask;
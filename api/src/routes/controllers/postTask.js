const { Userstories, Project, Task } = require("../../bd");

const postTask = async (
    idStorie, state, taskdetail, taskfinishdate
) => {
    let date = new Date()
        let day = date.getDate().toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        
        const taskdate = `${year}-${month}-${day}`;

    try {
    let newTask = await Task.create({
        state, taskdetail, taskdate, taskfinishdate
    });

    let storie = await Userstories.findOne({
        where: {
          id: idStorie,
        },
      });
    
      if (storie) {
        
    //    await newTask.setUserstories(storie.id);
    await newTask.setUserstory(storie);
      }
    

    return newTask;

  } catch (e) {
    console.log(" error en controller postTask ", e.message);
  }
};

module.exports = postTask;
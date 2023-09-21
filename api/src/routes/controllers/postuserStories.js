const { Userstories, Project } = require("../../bd");

const postUserStories = async (
  id, state, storiesname, storiesdetail, priority
) => {
  try {
    let newUserStorie = await Userstories.create({
        state, storiesname, storiesdetail, priority
    });

    let project = await Project.findOne({
        where: {
          id: id,
        },
      });
    
      if (project) {
       await newUserStorie.setProject(project.id);
      }
    

    return newUserStorie;

  } catch (e) {
    console.log(" error en controller postUserStories ", e.message);
  }
};

module.exports = postUserStories;
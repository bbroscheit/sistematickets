const { Project, User, Userstories, Task } = require("../../bd");
const { Op } = require("sequelize");

const getAllProjectsStoriesTask = async () => {
  try {
    const result = await Project.findAll({
      where: {
        state: {
          [Op.not]: "finalizado", // Filtrar proyectos cuyo estado no sea "finalizado"
        },
      },
      include: [
        {
          model: Userstories,
          where: {
            state: {
              [Op.not]: "cumplido", // Filtrar userstories cuyo estado no sea "cumplido"
            },
          },
          required: false, // Incluir userstories incluso si no tienen tareas
          include: [
            {
              model: Task,
              where: {
                state: {
                  [Op.not]: "cumplido", // Filtrar tareas cuyo estado no sea "cumplido"
                },
              },
              required: false, // Incluir tareas incluso si no tienen userstories
            },
          ],
        },
      ],
    });

    result.sort((a, b) => {
      return a.id - b.id;
    });

    return result;
  } catch (e) {
    console.log("error en ruta getAllProject", e.message);
  }
};

module.exports = getAllProjectsStoriesTask;

const { Project, User, Userstories, Task} = require('../../bd')
const {Op}  = require('sequelize')

const getAllProjectsStoriesTask = async () => {
    // try {
    //     let getAllProject = 
    //     await 
    //     Project.findAll({
    //         include: [
    //           {
    //             model: Userstories,
    //             include: [
    //               {
    //                 model: Task,
    //               },
    //             ],
    //             // where: {
    //             //   state: {
    //             //     [Op.not]: 'finalizado', // Filtrar userstories cuyo estado no sea "finalizado"
    //             //   },
    //             // },
    //           },
    //         ],
    //         where: {
    //           state: {
    //             [Op.not]: 'finalizado', // Filtrar proyectos cuyo estado no sea "finalizado"
    //           },
    //         },
    //       })

          try {
            const getAllProject = await Project.findAll({
              where: {
                state: {
                  [Op.not]: 'finalizado', // Filtrar proyectos cuyo estado no sea "finalizado"
                },
              },
              include: [
                {
                  model: Userstories,
                  where: {
                    state: {
                      [Op.not]: 'cumplido', // Filtrar userstories cuyo estado no sea "cumplido"
                    },
                  },
                  include: [
                    {
                      model: Task,
                      where: {
                        state: {
                          [Op.not]: 'cumplido', // Filtrar tasks cuyo estado no sea "cumplido"
                        },
                      },
                    },
                  ],
                },
              ],
            });
        

        getAllProject.sort(( a, b ) => { return a.id - b.id } )

        return getAllProject

    } catch (e) {
        console.log("error en ruta getAllProject", e.message)
    }
}

module.exports = getAllProjectsStoriesTask
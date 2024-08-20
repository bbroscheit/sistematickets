const { Newproject, User } = require('../../bd');

const getProjectByWorker = async (workerName) => {
    
    try {
        
        let getProjects = await Newproject.findAll({
            where: {isdelete : false},    
            include: {
                model: User,
            },
        });

        
        // Filtrar los proyectos donde el usuario esté, pero no en la primera posición
        const filteredProjects = getProjects.filter(project => {
            const users = project.users || [];
            // Verificar si el usuario está en alguna posición excepto la primera
            return users.slice(1).some(user => user.username === workerName);
        });

        // Ordenar por ID si es necesario
        filteredProjects.length > 0 ? filteredProjects.sort((a, b) => a.id - b.id) : filteredProjects = [];

        return filteredProjects;
    }catch(e){
        console.log( "error en controller getProjectByWorker" , e.message)
    }
}

module.exports = getProjectByWorker
const { Ticket, User } = require('../../bd');

const getInformacionTodosWorkers = async () => {
    try {
        const [workers, allTickets] = await Promise.all([
            User.findAll({
                where: { isdelete: false, isworker: true },
                attributes: ['id', 'firstname', 'lastname', 'username']
            }),
            Ticket.findAll({ attributes: ['worker', 'state', 'createdAt', 'updatedAt'] })
        ]);

        return workers.map(w => {
            const wTickets = allTickets.filter(t => t.worker === w.username);
            const terminados = wTickets.filter(t => t.state === 'Terminado');
            let sumaHs = 0;
            terminados.forEach(t => {
                sumaHs += (new Date(t.updatedAt) - new Date(t.createdAt)) / (1000 * 60 * 60);
            });

            return {
                id: w.id,
                firstname: w.firstname,
                lastname: w.lastname,
                username: w.username,
                totalTickets: wTickets.length,
                sinAsignar: wTickets.filter(t => t.state === 'sin asignar').length,
                asignados: wTickets.filter(t => t.state === 'Asignado').length,
                desarrollo: wTickets.filter(t => t.state === 'Desarrollo').length,
                informacion: wTickets.filter(t => t.state === 'Informacion').length,
                completado: wTickets.filter(t => t.state === 'Completado').length,
                terminado: terminados.length,
                hsPromedio: terminados.length > 0 ? (sumaHs / terminados.length).toFixed(2) : 0,
            };
        });
    } catch (e) {
        console.log('Error en controller getInformacionTodosWorkers:', e.message);
    }
};

module.exports = getInformacionTodosWorkers;

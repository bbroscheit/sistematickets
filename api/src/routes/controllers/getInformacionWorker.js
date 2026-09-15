const { Ticket, User } = require('../../bd');

const getInformacionWorker = async (id) => {
    const results = {
        totalTickets: 0,
        sinAsignar: 0,
        asignados: 0,
        desarrollo: 0,
        informacion: 0,
        completado: 0,
        terminado: 0,
        hsPromedio: 0
    };

    try{
        let workerFind = await User.findByPk(id);

        if(!workerFind){
            throw new Error("Worker no encontrado");
        }

        let getTickets = await Ticket.findAll({ where: { worker: workerFind.username } });

        results.totalTickets = getTickets.length;
        results.sinAsignar = getTickets.filter( e => e.state === "sin asignar").length;
        results.asignados = getTickets.filter( e => e.state === "Asignado").length;
        results.desarrollo = getTickets.filter( e => e.state === "Desarrollo").length;
        results.informacion = getTickets.filter( e => e.state === "Informacion").length;
        results.completado = getTickets.filter( e => e.state === "Completado").length;
        results.terminado = getTickets.filter( e => e.state === "Terminado").length;

        let ticketsTerminados = getTickets.filter( e => e.state === "Terminado");
        let sumaHs = 0;
        ticketsTerminados.forEach( e => {
            sumaHs += (new Date(e.updatedAt) - new Date(e.createdAt)) / (1000 * 60 * 60);
        });
        results.hsPromedio = ticketsTerminados.length > 0 ? (sumaHs / ticketsTerminados.length).toFixed(2) : 0;

        return results;
    }catch(e){
        console.log( "error en controller getInformacionWorker" , e.message)
    }
}

module.exports = getInformacionWorker;
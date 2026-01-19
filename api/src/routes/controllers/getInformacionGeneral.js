const { Ticket } = require('../../bd');

let results = {
    totalTickets: 0,
    sinAsignar: 0,
    asignados: 0,
    desarrollo: 0,
    informacion: 0,
    completado: 0,
    terminado: 0,
    hsPromedio: 0
};

const getInformacionGeneral = async () => {
    try{
        let getTickets = await Ticket.findAll()
        results.totalTickets = getTickets.length;

        results.sinAsignar = getTickets.filter( e => e.state === "sin asignar").length;
        results.asignados = getTickets.filter( e => e.state === "Asignado").length;
        results.desarrollo = getTickets.filter( e => e.state === "Desarrollo").length;
        results.informacion = getTickets.filter( e => e.state === "Informacion").length;
        results.completado = getTickets.filter( e => e.state === "Completado").length;
        results.terminado = getTickets.filter( e => e.state === "Terminado").length;
        
        //calculamos las hs promedio de los tickets terminados , tomando la fecha de creacion (cratedAT) y la fecha de termino (updatedAT)
        let ticketsTerminados = getTickets.filter( e => e.state === "Terminado");
        let sumaHs = 0;

        ticketsTerminados.forEach( e => {
            let fechaCreacion = new Date(e.createdAt);
            let fechaTermino = new Date(e.updatedAt);
            let diferenciaMs = fechaTermino - fechaCreacion;
            let diferenciaHs = diferenciaMs / (1000 * 60 * 60); // convertir ms a hs
            sumaHs += diferenciaHs;
        });

        results.hsPromedio = ticketsTerminados.length > 0 ? (sumaHs / ticketsTerminados.length).toFixed(2) : 0; 

        return results;
    }catch(e){
        console.log( "error en controller getInformacionGeneral" , e.message)
    }
}

module.exports = getInformacionGeneral;
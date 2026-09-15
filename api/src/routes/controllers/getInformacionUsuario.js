const { Ticket, User } = require('../../bd');

const getInformacionUsuario = async (user) => {
    const results = {
        totalTickets: 0,
        sinAsignar: 0,
        asignados: 0,
        desarrollo: 0,
        informacion: 0,
        completado: 0,
        terminado: 0,
        nombreCompleto: ""
    };

    try{
        let userFind = await User.findOne({ where: { username: user } });

        if(!userFind){
            throw new Error("Usuario no encontrado");
        }

        let getTickets = await Ticket.findAll({ where: { userId: userFind.id } });

        results.totalTickets = getTickets.length;
        results.sinAsignar = getTickets.filter( e => e.state === "sin asignar").length;
        results.asignados = getTickets.filter( e => e.state === "Asignado").length;
        results.desarrollo = getTickets.filter( e => e.state === "Desarrollo").length;
        results.informacion = getTickets.filter( e => e.state === "Informacion").length;
        results.completado = getTickets.filter( e => e.state === "Completado").length;
        results.terminado = getTickets.filter( e => e.state === "Terminado").length;
        results.nombreCompleto = userFind.firstname + " " + userFind.lastname;

        return results;
    }catch(e){
        console.log( "error en controller getInformacionUsuario" , e.message)
    }
}

module.exports = getInformacionUsuario;
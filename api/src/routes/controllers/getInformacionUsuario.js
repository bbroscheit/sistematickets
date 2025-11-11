const { Ticket, User } = require('../../bd');

let results = {
    totalTickets: 0,
    sinAsignar: 0,
    asignados: 0,
    desarrollo: 0,
    informacion: 0,
    completo: 0,
    terminado: 0,
    nombreCompleto: ""
};

const getInformacionUsuario = async (user) => {
    console.log("user", user)
    try{
        let userFind = await User.findAll({
            where: { username: user }
        })

        if(!userFind || userFind.length === 0){
            throw new Error("Worker no encontrado");
        }

        // buscamos todos los tickets asignados a este worker , usando su username como referencia
        let getTickets = await Ticket.findAll(
            {include:[{
                model:User,
            }]});

        getTickets = getTickets.filter( e => e.user.id === userFind[0].id );


        results.totalTickets = getTickets.length;

        results.sinAsignar = getTickets.filter( e => e.state === "sin asignar").length;
        results.asignados = getTickets.filter( e => e.state === "Asignado").length;
        results.desarrollo = getTickets.filter( e => e.state === "Desarrollo").length;
        results.informacion = getTickets.filter( e => e.state === "Informacion").length;
        results.completo = getTickets.filter( e => e.state === "Completo").length;
        results.terminado = getTickets.filter( e => e.state === "Terminado").length;
        results.nombreCompleto = userFind[0].firstname + " " + userFind[0].lastname;

        return results;
    }catch(e){
        console.log( "error en controller getInformacionUsuario" , e.message)
    }
}

module.exports = getInformacionUsuario;
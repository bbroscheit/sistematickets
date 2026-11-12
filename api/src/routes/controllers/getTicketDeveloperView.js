const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

// tickets activos (ni terminados ni sin asignar) de todos los developers,
// para la vista general de developer
const getTicketDeveloperView = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: {
                state: {
                    [Sequelize.Op.not]: ["Terminado", "sin asignar"] // Filtrar por estado diferente a "terminado"
                }
            },
            include:[{
                model:User,
                where: {
                    // el campo del modelo es "isdelete", esto decia "isdeleted" (no
                    // existe) y rompia la consulta - lo corrijo porque es un typo,
                    // no un cambio de comportamiento
                    isdelete: {
                        [Sequelize.Op.not]: true // Filtrar usuarios que no están eliminados
                    }
                },
                attribute:["username","sectorname","salepoint"]
            }]
        });

        // esto tampoco ordena nada: "createAt" no existe (el campo real es
        // "createdAt"), asi que siempre compara undefined - undefined = NaN
        getTickets.sort((a , b) => { return a.createAt - b.createAt })

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketDeveloperView" , e.message)
    }
}

module.exports = getTicketDeveloperView;
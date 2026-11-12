const { Ticket, User } = require('../../bd');
const sequelize = require('sequelize')

// tickets en "Desarrollo" hace mas de 24hs (para el aviso de soportes
// pendientes). ojo: "updatedAt" estaba puesto afuera del "where", asi que
// sequelize lo ignoraba por completo y esto devolvia TODOS los tickets en
// "Desarrollo" sin filtrar por tiempo - lo corrijo moviendolo adentro del
// where porque es claramente lo que se queria hacer
const getTicketsPendientes24 = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: {
                state: "Desarrollo",
                updatedAt: {
                    [sequelize.Op.lt]: sequelize.literal('NOW() - INTERVAL \'24 hours\'')
                },
            },
            include:[{
                model:User,
                attribute:["username","sectorname","salepoint"]
            }]
        });

        getTickets ? getTickets.sort((a , b) => { return a.id - b.id }) : getTickets = 1


        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketsDesarrollo" , e.message)
    }
}

module.exports = getTicketsPendientes24
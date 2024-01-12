const { Ticket, User } = require('../../bd');
const sequelize = require('sequelize')

const getTicketsPendientes24 = async () => {
    try{
        let getTickets = await Ticket.findAll({
            where: { state: "Desarrollo" },
            updatedAt: {
                [sequelize.Op.lt]: sequelize.literal('NOW() - INTERVAL \'24 hours\'')
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
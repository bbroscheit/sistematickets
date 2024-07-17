const { Ticket, User, Sector } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketSupervisorCardGeneral = async () => {
    
    let employees = [   
                        "Pranieri" , 
                        "Lalfaro", 
                        "Tbobadilla", 
                        "Mdardenne", 
                        "Xmamani",
                        "MRomero",
                        "Mjalid", 
                        "Vgonzalez", 
                        "Dgimenez", 
                        "Rmorris", 
                        "Mperez", 
                        "Cgaravano", 
                        "Gvillareal",
                    ]

    try{
        
        let getTickets = await Ticket.findAll({
            include: [{
                model: User,
                required: true,
                where: {
                    username: {
                        [Sequelize.Op.in]: employees
                    }
                }
            }],
            where: {
                state: {
                    [Sequelize.Op.not]: "Terminado"
                }
            },
            order: [['state', 'ASC']]
        });

        return getTickets;
    }catch(e){
        console.log( "error en controller getTicketSupervisorCard" , e.message)
    }
}

module.exports = getTicketSupervisorCardGeneral;
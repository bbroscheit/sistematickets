const { Ticket, User, Sector } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketSupervisorCardGeneralGerencia = async () => {
    
    let employees = [   
                        "Pranieri" , 
                        "Lalfaro", 
                        "Tbobadilla", 
                        "Mdardenne", 
                        "Xmamani",
                        "Mromero",
                        "Mjalid", 
                        "Vgonzalez", 
                        "Dgimenez", 
                        "Rmorris", 
                        "Mperez", 
                        "Cgaravano", 
                        "Gvillareal",
                        "Sparente",
                        "Tsobothe",
                        "Mobejero",
                        "Dsoro",
                        "Lbergara",
                        "Rflecha"

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
        console.log( "error en controller getTicketSupervisorCardGeneralGerencia" , e.message)
    }
}

module.exports = getTicketSupervisorCardGeneralGerencia;
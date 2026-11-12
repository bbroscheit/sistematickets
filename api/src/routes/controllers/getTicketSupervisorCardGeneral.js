const { Ticket, User, Sector } = require('../../bd');
const { Sequelize } = require('sequelize');

// tickets de un grupo de empleados hardcodeado a mano (en vez de resolverse
// por sector/rol) - parece un workaround puntual para una gerencia en
// particular, no escala si se suma gente nueva a ese grupo
const getTicketSupervisorCardGeneral = async () => {

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
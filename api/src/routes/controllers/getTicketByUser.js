const { Ticket, User } = require('../../bd');
const { Sequelize } = require('sequelize');

const getTicketByUser = async (username) => {
    console.log("username en controller", username)
    try{

        let getTIcketByName = await Ticket.findAll({
            require: true,
            include:{
                model:User,
                where: { username: username},
            },
            where: {
                state: {
                    [Sequelize.Op.not]: "Terminado"
                }
            },
        });

        console.log("getTIcketByName en controller", getTIcketByName)
        return getTIcketByName;
    }catch(e){
        console.log( "error en controller getTicketByUser" , e.message)
    }
}

module.exports = getTicketByUser
const { Capacitation, User } = require('../../bd');

const getCapacitationById = async (id) => {
    
    try {
        let capacitationDetail = await Capacitation.findOne({
            where:{ id : id }, 
            include:[{
                model:User,
                attribute:["username"]
            }]
        });
        return capacitationDetail;
    } catch (e) {
        console.log("Error en controllers/capacitationDetail.js" , e.message)
    }
}



module.exports = getCapacitationById;
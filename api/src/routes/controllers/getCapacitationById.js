const { Capacitation, User } = require('../../bd');

// detalle de una capacitacion puntual
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
const { Desarrollo, User } = require('../../bd');

const getDesarrolloById = async (id) => {
    
    try {
        let desarrolloDetail = await Desarrollo.findOne({
            where:{ id : id }, 
            include:[{
                model:User,
                as: 'users', 
                attribute:["username"]
            }]
        });
        
        console.log("id en desarrolloDetail", desarrolloDetail);
        return desarrolloDetail;
    } catch (e) {
        console.log("Error en controllers/desarrolloDetail.js" , e.message)
    }
}

module.exports = getDesarrolloById;
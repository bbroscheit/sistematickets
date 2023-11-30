const { User } = require('../../bd');

const getUserDetail = async (id) => {
    
    try {
        let userDetail = await User.findOne({
            where:{id: id}
        });
        return userDetail;
    } catch (e) {
        console.log("Error en controllers/getUserDetail.js" , e.message)
    }
}



module.exports = getUserDetail;
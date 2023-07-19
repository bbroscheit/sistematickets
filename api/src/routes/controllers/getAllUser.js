const {User} = require('../../bd');

const getAllUsers = async () => {
    try {
        let allUsers = await User.findAll({
            where:{isdelete:false},           
        });
        return allUsers;
    } catch (e) {
        console.log("Error en controllers/getAllUser.js" , e.message)
    }
}



module.exports = getAllUsers;
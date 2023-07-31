const {User} = require('../../bd');

const getUser = async (username, password) => {
    try {
        let user = await User.findAll({
            where:{isdelete:false}, 

        });
        return user;
    } catch (e) {
        console.log("Error en controllers/getUser.js" , e.message)
    }
}



module.exports = getUser;
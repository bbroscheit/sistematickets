const { User } = require('../../bd');

const getUserByName = async (worker) => {
    
    try{
        let getUser = await User.findAll({
            where: { username: worker},
        });
        
        return getUser;
    }catch(e){
        console.log( "error en helper getUserByName " , e.message)
    }
}

module.exports = getUserByName 
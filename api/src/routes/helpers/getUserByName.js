const { User } = require('../../bd');

// busca un usuario por username. ojo que devuelve un array (findAll), aunque
// el username deberia ser unico
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
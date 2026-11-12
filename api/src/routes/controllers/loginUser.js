const {User} = require('../../bd');
const {Sector} = require('../../bd');
const {Salepoint} = require ('../../bd');
const {Role} = require ('../../bd');

const loginUser = async (username,password) => {

    // los usernames se guardan con la primera letra en mayuscula, por eso
    // se normaliza asi antes de buscar (para que de igual si escriben
    // "juan" o "Juan")
    let modifiedUsername = username.charAt(0).toUpperCase() + username.slice(1)
    
    try {
        let user = await User.findOne({
            where:{ isdelete:false , username:modifiedUsername, password:password}, 
            include:[
                { model: Sector, as: "sectors", through: { attributes: [] } },
                { model: Salepoint, as: "salepoints", through: { attributes: [] } },
                { model: Role, as: "role" }
            ]
        });
        // console.log(user)
        return user;
    } catch (e) {
        console.log("Error en controllers/getUser.js" , e.message)
    }
}



module.exports = loginUser;
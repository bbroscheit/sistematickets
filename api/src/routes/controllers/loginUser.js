const {User} = require('../../bd');
const {Sector} = require('../../bd');
const {Salepoint} = require ('../../bd');
const {Role} = require ('../../bd');

const loginUser = async (username,password) => {
    
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
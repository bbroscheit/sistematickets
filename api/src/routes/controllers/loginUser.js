const {User} = require('../../bd');
const {Sector} = require('../../bd');
const {Salepoint} = require ('../../bd');

const loginUser = async (username,password) => {
    
    try {
        let user = await User.findOne({
            where:{isdelete:false , username:username, password:password}, 
            include:[{
                model:Sector,
                attribute:["sector"]
            },{
                model:Salepoint,
                attribute:["salepoint"]
            }]
        });
        console.log(user)
        return user;
    } catch (e) {
        console.log("Error en controllers/getUser.js" , e.message)
    }
}



module.exports = loginUser;
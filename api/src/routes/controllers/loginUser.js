const {User} = require('../../bd');
const {Sector} = require('../../bd');
const {Salepoint} = require ('../../bd');

const loginUser = async (username,password) => {
    console.log("username loginUser" , username)
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
        return user;
    } catch (e) {
        console.log("Error en controllers/getUser.js" , e.message)
    }
}



module.exports = loginUser;
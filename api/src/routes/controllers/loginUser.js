const {User} = require('../../bd');
const {Sector} = require('../../bd');
const {Salepoint} = require ('../../bd');

const loginUser = async (username,password) => {
    
    let modifiedUsername = username.charAt(0).toUpperCase() + username.slice(1)
    
    try {
        let user = await User.findOne({
            where:{ isdelete:false , username:modifiedUsername, password:password}, 
            include:[{
                model:Sector,
                attribute:["sector"]
            },{
                model:Salepoint,
                attribute:["salepoint"]
            }]
        });
        // console.log(user)
        return user;
    } catch (e) {
        console.log("Error en controllers/getUser.js" , e.message)
    }
}



module.exports = loginUser;
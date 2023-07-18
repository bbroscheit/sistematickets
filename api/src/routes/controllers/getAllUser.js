const {Sector} = require('../../bd');
const {Ticket} = require('../../bd');
const {User} = require('../../bd');

const getAllUsers = async () => {
    try {
        const allUsers = await User.findAll({
            where:{isdelete:false},
            include:{
                model:Sector,
                attribute:["id"],
                where:{isdelete:false}
            },
            
        });
        return allUsers;
    } catch (e) {
        console.log("Error en controllers/getAllUser.js" , e.message)
    }
}

module.exports = getAllUsers;
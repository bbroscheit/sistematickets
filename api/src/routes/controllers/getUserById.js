const {Sector} = require('../../bd');
const {User} = require('../../bd');
const {Ticket} = require('../../bd');

const userById = async (id) => {
    try{
        const user = await User.findByPk(id, {
            include:[
                {
                    model:Sector,
                    attribute: ["sectorname"],
                },
                {
                    model:Ticket,
                    attribute:[ "id","state","subject"]
                }
            ]
        });
        return user;
    }catch(e){
        console.log("error en controllers/getUserById",e.message)
    }
}

module.exports = userById;
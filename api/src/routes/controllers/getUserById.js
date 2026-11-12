const {Sector} = require('../../bd');
const {User} = require('../../bd');
const {Ticket} = require('../../bd');

// detalle de usuario con su sector (ojo: include sin alias - ver nota de
// aliases en getTicketBySalepoint.js, esto puede estar roto igual) y sus
// tickets
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
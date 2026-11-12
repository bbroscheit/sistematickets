const {User, Sector, Salepoint} = require('../../bd');

// trae todos los usuarios activos con sus sectores y puntos de venta
const getAllUsers = async () => {
    try {
        let allUsers = await User.findAll({
            where:{isdelete:false},  
            include:[
                { model: Sector, as: "sectors", through: { attributes: [] } },
                { model: Salepoint, as: "salepoints", through: { attributes: [] } }
            ]  
        });

        allUsers.sort((a , b) => { return a.id - b.id })

        return allUsers;
    } catch (e) {
        console.log("Error en controllers/getAllUser.js" , e.message)
    }
}



module.exports = getAllUsers;
const { User, Sector, Salepoint } = require('../../bd');

const getUserDetail = async (id) => {

    try{
        const user = await User.findByPk(id, {
            include:[
                { model: Sector, as: "sectors", through: { attributes: [] } },
                { model: Salepoint, as: "salepoints", through: { attributes: [] } },
                { model: User, as: "manager", attributes: ['id', 'firstname', 'lastname', 'username'] }
            ]
        });
        return user;
    } catch (e) {
        console.log("Error en controllers/getUserDetail.js" , e.message)
    }
}



module.exports = getUserDetail;
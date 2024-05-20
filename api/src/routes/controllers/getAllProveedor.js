const { Proveedor } = require('../../bd');

const getAllProveedor = async () => {
    try {
        let allProveedor= await Proveedor.findAll({
            where:{isdelete:false},  
        });

        allProveedor.sort((a , b) => { return a.id - b.id })

        return allProveedor;
    } catch (e) {
        console.log("Error en controllers/getAllProveedor.js" , e.message)
    }
}



module.exports = getAllProveedor;
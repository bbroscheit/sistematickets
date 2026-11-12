const { Role } = require('../../bd');

// trae los roles (empleado/encargado/jefe/gerente) para el desplegable
// de alta/edicion de usuario
const getAllRoles = async() => {
    try {
        let allRoles = await Role.findAll();
        return allRoles
    } catch (e) {
        console.log( "error en controller getAllRoles", e.message)
    }
}

module.exports = getAllRoles;
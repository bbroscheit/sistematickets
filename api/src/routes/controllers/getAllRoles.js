const { Role } = require('../../bd');

const getAllRoles = async() => {
    try {
        let allRoles = await Role.findAll();
        return allRoles
    } catch (e) {
        console.log( "error en controller getAllRoles", e.message)
    }
}

module.exports = getAllRoles;
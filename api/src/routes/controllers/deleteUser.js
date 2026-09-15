const { User } = require('../../bd');

const deleteUser = async (id) => {
    try{
        const userToDelete = await User.findByPk(id)
        if (!userToDelete) {
            console.log("error en controller deleteUser: usuario no encontrado", id)
            return null
        }
        await userToDelete.update({ isdelete: true })
        return userToDelete
    }catch(e){
        console.log( "error en controller deleteUser" , e.message)
        return null
    }
}

module.exports = deleteUser;
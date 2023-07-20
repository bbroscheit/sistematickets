const { User } = require('../../bd');

const deleteUser = async (id) => {
    try{
        const deleteUser = await User.findByPk(id)
        await deleteUser.update(
            { isdelete: true },
            { where: {id:id}}
        )
        return deleteUser
    }catch(e){
        console.log( "error en controller deleteUser" , e.message)
    }
}

module.exports = deleteUser;
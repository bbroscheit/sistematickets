const {User } = require ('../../bd');

// el usuario edita sus propios datos basicos (sin tocar sector/sucursal/
// rol, eso solo lo puede cambiar un admin desde updateUser.js)
const updateUserByUser = async ( id, username, firstname, lastname, password, email, phonenumber ) => {
    try{
        let setUser = await User.findByPk(id);

        await User.update(
            {
                username, 
                firstname, 
                lastname,
                password, 
                email, 
                phonenumber, 
            },
            {
                where: { id: id}
            }
        );

        return setUser;
    }catch(e){
        console.log( "error en controller updateUserByUser", e.message);
    }
}

module.exports = updateUserByUser;
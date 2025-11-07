const {User } = require ('../../bd');

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
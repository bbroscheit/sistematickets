const { User, Sector } = require('../../bd');

const postUser = async (username, firstname, lastname, password, email, phonenumber, isworker, sectorname,salepoint ) => {
    try{
        let newUser = await User.create({
            username,
            firstname,
            lastname,
            password,
            email,
            phonenumber,
            isworker
        })

        if(sectorname){
            let setSector = await Sector.findAll({
                 sectorname,
            })
            newUser.addSector(setSector)
        }

        if(salepoint){
            let setSalePoint = await Sector.findAll({
                 salepoint,
            })
            newUser.addSector(setSalePoint)
        }


        return newUser;
    }catch(e){
        console.log(" error en controller postUser ",e.message)
    }
};

module.exports= postUser;


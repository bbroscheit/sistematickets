const {User, Sector, Salepoint } = require ('../../bd');

const updateUser = async ( id, username, firstname, lastname, password, email, phonenumber, isworker, sectorname,salepoint  ) => {
    try{
        let setUser = await User.fidnByPk(id , {
            include:[
                {
                    model: Sector,
                    attribute: ['sectorname']
                },{
                    model: Salepoint,
                    attribute: ['salepoint']
                }
            ]
        });

        if(sectorname){
            const setSector = await Sector.findOne({
                where: { sectorname : sectorname}
            })
            if(setSector){
                await setUser.setSector();
                await setUser.setSector(setSector);
            }
        };

        if(salepoint){
            const setSalepoint = await Salepoint.findOne({
                where: { salepoint : salepoint }
            })
            if(setSalepoint){
                await setUser.setSalepoint();
                await setUser.setSalepoint(setSalepoint)
            }
        };

        await User.update(
            {
                username, 
                firstname, 
                lastname,
                password, 
                email, 
                phonenumber, 
                isworker, 
            },
            {
                where: { id: id}
            }
        );

        return setUser;
    }catch(e){
        console.log( "error en controller updateUser", e.message);
    }
}

module.export = updateUser;
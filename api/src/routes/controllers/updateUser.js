// const {User, Sector, Salepoint } = require ('../../bd');

// const updateUser = async ( id, username, firstname, lastname, password, email, phonenumber, isworker,
//     isprojectmanager,
//     isprojectworker, sectorname,salepoint  ) => {
//     try{
//         let setUser = await User.findByPk(id , {
//             include:[
//                 {
//                     model: Sector,
//                     attribute: ['sectorname']
//                 },{
//                     model: Salepoint,
//                     attribute: ['salepoint']
//                 }
//             ]
//         });

//         if(sectorname){
//             const setSector = await Sector.findOne({
//                 where: { sectorname : sectorname}
//             })
//             if(setSector){
//                 await setUser.setSector();
//                 await setUser.setSector(setSector);
//             }
//         };

//         if(salepoint){
//             const setSalepoint = await Salepoint.findOne({
//                 where: { salepoint : salepoint }
//             })
//             if(setSalepoint){
//                 await setUser.setSalepoint();
//                 await setUser.setSalepoint(setSalepoint)
//             }
//         };

//         await User.update(
//             {
//                 username, 
//                 firstname, 
//                 lastname,
//                 password, 
//                 email, 
//                 phonenumber, 
//                 isworker, 
//                 isprojectmanager ,
//                 isprojectworker ,
//             },
//             {
//                 where: { id: id}
//             }
//         );

//         return setUser;
//     }catch(e){
//         console.log( "error en controller updateUser", e.message);
//     }
// }

// module.exports = updateUser;

const { User, Sector, Salepoint, Role } = require("../../bd");

const updateUser = async (
  id,
 
    username,
    firstname,
    lastname,
    password,
    email,
    phonenumber,
    isworker,
    isprojectmanager,
    isprojectworker,
    sectorIds,
    salepointIds,
    roleId,
  
) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    await user.update({
      username,
      firstname,
      lastname,
      password,
      email,
      phonenumber,
      isworker,
      isprojectmanager,
      isprojectworker,
      roleId,
    });

    if (Array.isArray(sectorIds)) {
      const sectors = await Sector.findAll({
        where: { id: sectorIds },
      });

      await user.setSectors(sectors); // borra y vuelve a asignar
    }

    if (Array.isArray(salepointIds)) {
      const salepoints = await Salepoint.findAll({
        where: { id: salepointIds },
      });

      await user.setSalepoints(salepoints);
    }

    return await User.findByPk(id, {
      include: [[
                { model: Sector, as: "sectors", through: { attributes: [] } },
                { model: Salepoint, as: "salepoints", through: { attributes: [] } },
                { model: Role, as: "role" }
            ] ],
    });
  } catch (e) {
    console.error("Error en updateUser:", e.message);
    throw e;
  }
};

module.exports = updateUser;

const { User, Sector, Salepoint } = require("../../bd");

const postUser = async (
  username,
  firstname,
  lastname,
  password,
  email,
  phonenumber,
  isworker,
  isprojectmanager,
  isprojectworker,
  sectorname,
  salepoint
) => {
  try {
    let newUser = await User.create({
      username,
      firstname,
      lastname,
      password,
      email,
      phonenumber,
      isworker,
      isprojectmanager,
      isprojectworker
    });

    if (sectorname) {
      let sector = await Sector.findOne({
        where: {
          sectorname: sectorname,
        },
      });
      if (sector) {
       // sector/salepoint de user son relaciones many-to-many (ver user.js),
       // asi que el metodo es "addSector" y no "setSector" (ese ultimo no
       // existe y tiraba "newUser.setSector is not a function" - la pantalla
       // de alta de usuario quedaba creando el usuario sin sector asignado y
       // devolviendo error al front)
       await newUser.addSector(sector.id);
      }
    }

    if (salepoint) {
      let setSalepoint = await Salepoint.findOne({
        where: {
          salepoint: salepoint,
        },
      });
      if (setSalepoint) {
        await newUser.addSalepoint(setSalepoint.id);
      }
    }

    return newUser;
  } catch (e) {
    console.log(" error en controller postUser ", e.message);
  }
};

module.exports = postUser;

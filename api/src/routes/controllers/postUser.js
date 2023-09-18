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
       await newUser.setSector(sector.id);
      }
    }

    if (salepoint) {
      let setSalepoint = await Salepoint.findOne({
        where: {
          salepoint: salepoint,
        },
      });
      if (setSalepoint) {
        await newUser.setSalepoint(setSalepoint.id);
      }
    }

    return newUser;
  } catch (e) {
    console.log(" error en controller postUser ", e.message);
  }
};

module.exports = postUser;

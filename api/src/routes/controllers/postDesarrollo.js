const { Desarrollo, User } = require("../../bd");

const postDesarrollo = async (title, state, users) => {
  try {
    // Creo el ticket vacio para tener el ID que le va a dar nombre a la carpeta
    const newDesarrollo = await Desarrollo.create({
      title,
      state,
    });

    const findUsers = await User.findAll({
      where: {
        username: users,
      },
    });

    await newDesarrollo.setUsers(findUsers);

    return newDesarrollo;
  } catch (e) {
    console.log("Error en controller postDesarrollo", e.message);
    throw e;
  }
};

module.exports = postDesarrollo;

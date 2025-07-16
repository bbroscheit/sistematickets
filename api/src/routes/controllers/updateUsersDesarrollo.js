const { Desarrollo, User } = require("../../bd");

const updateUsersDesarrollo = async ( id,  users) => {
    
    try {
    const desarrollo = await Desarrollo.findByPk(id);
    if (!desarrollo) throw new Error("Desarrollo no encontrado");

    // Separar los que ya tienen ID de los que solo son username
    const userIds = [];
    const usernames = [];

    users.forEach((user) => {
      if (typeof user === "object" && user.id) {
        userIds.push(user.id);
      } else if (typeof user === "string") {
        usernames.push(user);
      }
    });

    // Buscar los que llegaron como username
    const foundByUsername = await User.findAll({
      where: {
        username: usernames,
      },
    });

    // Unir todos los usuarios a asociar
    const allUserIds = [
      ...userIds,
      ...foundByUsername.map((u) => u.id),
    ];

    const allUsers = await User.findAll({
      where: {
        id: allUserIds,
      },
    });

    // Reemplaza completamente los usuarios asociados
    await desarrollo.setUsers(allUsers);

    return desarrollo;
  } catch (e) {
    console.log("Error en controller updateUsersDesarrollo:", e.message);
    throw e;
  }

};

module.exports = updateUsersDesarrollo;
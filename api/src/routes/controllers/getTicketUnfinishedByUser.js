const { Ticket, User, Sector, Salepoint, Role } = require("../../bd");
const { Op } = require("sequelize");

const getTicketsUnfinishedByUser = async (userId) => {
  //console.log("getTicketsUnfinishedByUser - userId:", userId);
  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: Role, as: "role" },
        { model: Sector, as: "sectors", through: { attributes: [] } },
        { model: Salepoint, as: "salepoints", through: { attributes: [] } },
      ],
    });

    if (!user) throw new Error("Usuario no encontrado");

    // si el usuario todavia no tiene un rol asignado (caso esperado en producción
    // hasta que se le asigne uno a todo el mundo), se lo trata como "empleado"
    // (el nivel más restrictivo) en vez de romper
    const roleName = user.role ? user.role.name : "empleado";

    const sectorIds = user.sectors.map((s) => s.id);
    const salepointIds = user.salepoints.map((sp) => sp.id);
    //console.log("Usuario encontrado:", user.id, "Role:", roleName, "Sectors:", sectorIds, "Salepoints:", salepointIds);
    // Roles visibles según jerarquía (siempre incluye el propio rol, para que
    // el usuario vea tambien sus propios tickets)
    let visibleRoles = [];

    switch (roleName) {
      case "empleado":
        visibleRoles = ["empleado"];
        break;
      case "encargado":
        visibleRoles = ["empleado", "encargado"];
        break;
      case "jefe":
        visibleRoles = ["empleado", "encargado", "jefe"];
        break;
      case "gerente":
        visibleRoles = ["empleado", "encargado", "jefe", "gerente"];
        break;
      default:
        visibleRoles = [];
    }

    // el filtro de rol + sector + sucursal aplica siempre, "gerente" incluido:
    // un gerente de cobranzas de buenos aires solo debe ver a el mismo y a sus
    // empleados, dentro de cobranzas y de buenos aires (antes se saltaba todo
    // esto y veia literalmente a todos los usuarios del sistema)
    const tickets = await Ticket.findAll({
      where: {
        state: { [Op.not]: "Terminado" },
      },
      include: [
        {
          model: User,
          as: "user",
          required: true,
          include: [
            {
              model: Role,
              as: "role",
              where: { name: { [Op.in]: visibleRoles } },
              required: true,
            },
            {
              model: Sector,
              as: "sectors",
              through: { attributes: [] },
              where: { id: { [Op.in]: sectorIds } },
              required: true,
            },
            {
              model: Salepoint,
              as: "salepoints",
              through: { attributes: [] },
              where: { id: { [Op.in]: salepointIds } },
              required: true,
            },
          ],
        },
      ],
      distinct: true,
    });

    return tickets;
  } catch (e) {
    console.error("Error getTicketsUnfinishedByUser:", e.message);
    throw e;
  }
};

module.exports = getTicketsUnfinishedByUser;

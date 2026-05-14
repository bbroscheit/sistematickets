const { Ticket, User, Sector, Salepoint, Role } = require("../../bd");
const { Op, Sequelize } = require("sequelize");

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

    const roleName = user.role.name; // ej: "empleado", "encargado", etc

    const sectorIds = user.sectors.map((s) => s.id);
    const salepointIds = user.salepoints.map((sp) => sp.id);
    //console.log("Usuario encontrado:", user.id, "Role:", roleName, "Sectors:", sectorIds, "Salepoints:", salepointIds);
    // Roles visibles según jerarquía
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
        visibleRoles = null; // ve todo
        break;
      default:
        visibleRoles = [];
    }

    const whereTicket = {
      state: { [Op.not]: "Terminado" },
    };

    // Si NO es gerente, aplicamos filtros
    if (roleName !== "gerente") {
      whereTicket.userId = {
        [Op.in]: Sequelize.literal(`
          (
            SELECT u.id
            FROM "Users" u
            JOIN "Roles" r ON r.id = u."roleId"
            WHERE r.name IN (${visibleRoles.map((r) => `'${r}'`).join(",")})
          )
        `),
      };
    }

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
              ...(roleName !== "gerente" && {
                where: { name: { [Op.in]: visibleRoles } },
                required: true,
              }),
            },
            {
              model: Sector,
              as: "sectors",
              through: { attributes: [] },
              ...(roleName !== "gerente" && {
                where: { id: { [Op.in]: sectorIds } },
                required: true,
              }),
            },
            {
              model: Salepoint,
              as: "salepoints",
              through: { attributes: [] },
              ...(roleName !== "gerente" && {
                where: { id: { [Op.in]: salepointIds } },
                required: true,
              }),
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

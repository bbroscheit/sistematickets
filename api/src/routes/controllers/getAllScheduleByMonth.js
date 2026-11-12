const { Schedule, User} = require('../../bd')
const { Sequelize } = require('sequelize');
const dayjs = require('dayjs');


// trae las reuniones de un usuario en un mes dado. "invited" es un array
// de texto con nombres/usernames (ver sendEmailSchedule.js), por eso se
// busca con ANY() en vez de una relacion normal.
// ojo: el username y el nombre completo se meten directo en el literal
// de sequelize (no van como parametro bindeado) - si algun username o
// nombre tuviera una comilla simple esto rompería la query. hoy no se ve
// el problema porque los usuarios se cargan a mano, pero no es la forma
// segura de armar la consulta
const getAllScheduleByMonth = async (month, user) => {
    
    try {
        // Calculamos el año actual
        const currentYear = dayjs().year();

        // Buscamos el usuario en la tabla Users
        const foundUser = await User.findOne({
            where: {
                username: user
            }
        });

        if (!foundUser) {
            throw new Error('User not found');
        }

        const fullName = `${foundUser.firstname} ${foundUser.lastname}`;

        // Buscamos schedules que tengan startdate dentro del mes dado y que incluyan el usuario en el campo invited
        let getSchedule = await Schedule.findAll({
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.literal(`EXTRACT(MONTH FROM "startdate")`), month),
                    Sequelize.where(Sequelize.literal(`EXTRACT(YEAR FROM "startdate")`), currentYear),
                    { isdelete: false },
                    {
                        [Sequelize.Op.or]: [
                            Sequelize.literal(`'${foundUser.username}' = ANY("invited")`),
                            Sequelize.literal(`'${fullName}' = ANY("invited")`)
                        ]
                    }
                ]
            }
        });

        // Ordenamos por hora de inicio
        getSchedule.sort((a, b) => dayjs(a.starthour).diff(dayjs(b.starthour)));

        return getSchedule;

    } catch (e) {
        console.log("error en ruta getAllScheduleByMonth", e.message);
        throw e;
    }

}

module.exports = getAllScheduleByMonth

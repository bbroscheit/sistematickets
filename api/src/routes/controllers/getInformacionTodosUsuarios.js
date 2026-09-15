const { Ticket, User } = require('../../bd');

const getInformacionTodosUsuarios = async () => {
    try {
        const allTickets = await Ticket.findAll({
            attributes: ['state', 'userId'],
            include: [{ model: User, attributes: ['id', 'firstname', 'lastname', 'username'] }]
        });

        const userMap = new Map();

        allTickets.forEach(t => {
            if (!t.user) return;
            const uid = t.user.id;
            if (!userMap.has(uid)) {
                userMap.set(uid, {
                    userId: uid,
                    username: t.user.username,
                    nombreCompleto: `${t.user.firstname} ${t.user.lastname}`,
                    totalTickets: 0,
                    sinAsignar: 0,
                    asignados: 0,
                    desarrollo: 0,
                    informacion: 0,
                    completado: 0,
                    terminado: 0,
                });
            }
            const entry = userMap.get(uid);
            entry.totalTickets++;
            if (t.state === 'sin asignar') entry.sinAsignar++;
            else if (t.state === 'Asignado') entry.asignados++;
            else if (t.state === 'Desarrollo') entry.desarrollo++;
            else if (t.state === 'Informacion') entry.informacion++;
            else if (t.state === 'Completado') entry.completado++;
            else if (t.state === 'Terminado') entry.terminado++;
        });

        return Array.from(userMap.values());
    } catch (e) {
        console.log('Error en controller getInformacionTodosUsuarios:', e.message);
    }
};

module.exports = getInformacionTodosUsuarios;

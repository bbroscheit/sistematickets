const { Schedule } = require('../../bd')

const toggleAccepted = async (id, user, firstname , lastname) => {
    let completeName = `${firstname} ${lastname}`
    try {
        // Obtener el ticket actual
        const existingSchedule = await Schedule.findByPk(id);

        if (!existingSchedule) {
            throw new Error('Schedule no encontrado');
        }

        if (existingSchedule.accepted.include( e === "user") || existingSchedule.accepted.include( e === completeName))
        // Actualizar el ticket con el nuevo detail
        // let setTicket = await existingTicket.update({ 
        //     detail: updatedDetail, 
        //     state: "Desarrollo" 
        // });

        setTicket = await existingTicket.update({
            files: existingTicket.files
        });

    return setTicket;
} catch (error) {
    console.error("Error en toggleAccepted", error.message);
    throw error; 
}}

module.exports= toggleAccepted
const { Schedule } = require('../../bd')

const toggleAccepted = async (id, answer) => {
    try {
        // Obtener el ticket actual
        const existingSchedule = await Schedule.findByPk(id);

        if (!existingSchedule) {
            throw new Error('Schedule no encontrado');
        }

        // Actualizar el ticket con el nuevo detail
        let setTicket = await existingTicket.update({ 
            detail: updatedDetail, 
            state: "Desarrollo" 
        });

        setTicket = await existingTicket.update({
            files: existingTicket.files
        });

    return setTicket;
} catch (error) {
    console.error("Error en toggleAccepted", error.message);
    throw error; 
}}

module.exports= toggleAccepted
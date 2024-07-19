const { Schedule } = require('../../bd')

const toggleAccepted = async (id, user, firstname , lastname) => {
    let completeName = `${firstname} ${lastname}`
    let updateSchedule
    
    try {
        
        const existingSchedule = await Schedule.findByPk(id);
            
        if (!existingSchedule) {
            throw new Error('Schedule no encontrado');
        }

        let invited = existingSchedule.invited;
        let acceptedArray = existingSchedule.accepted;

        if(!invited.includes(user) && !invited.includes(completeName)){
            throw new Error('Usuario no invitado');
        }

        if (!acceptedArray.includes(user) && !acceptedArray.includes(completeName)) {
            acceptedArray.push(completeName);
            
        } else {
            acceptedArray = acceptedArray.filter(name => name !== user && name !== completeName);
            console.log("Usuario eliminado de la lista de aceptados");
        }

        updateSchedule = await Schedule.update(
            { accepted : acceptedArray},
            { where: { id : id} }
        )

        console.log("update", updateSchedule)

    return updateSchedule;
} catch (error) {
    console.error("Error en toggleAccepted", error.message);
    throw error; 
}}

module.exports= toggleAccepted
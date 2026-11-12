const { Ticket } = require('../../bd')

// cambia la prioridad de un ticket. la funcion de adentro se llama
// "updateAssignment" por un copy-paste de otro archivo, pero lo que
// importa es el export (que si se usa como updatePriority en el router)
const updateAssignment = async (id, newPriority) => {
    try {
        let setTicket = await Ticket.update(
            { priority : newPriority},
            { where: { id:id } } 
          );
        return setTicket

    } catch (error) {
        console.log(error)
    }
   
    
}

module.exports= updateAssignment
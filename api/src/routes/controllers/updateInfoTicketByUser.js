const { Ticket } = require('../../bd')

const updateInfoTicketByuser = async (id, info) => {

    // Obtener el ticket actual
    const existingTicket = await Ticket.findByPk(id);

    if (!existingTicket) {
        throw new Error('Ticket no encontrado');
    }

    // Obtener el valor actual de detail
    const currentDetail = existingTicket.detail || '';

    // Agrega un salto de linea 
    const formattedNewInfo = `\n${info}\n`;

    // Concatenar el nuevo contenido con el valor actual de detail
    const updatedDetail = currentDetail + formattedNewInfo;

    // Actualizar el ticket con el nuevo detail
    const setTicket = await existingTicket.update({ detail: updatedDetail, state: "Desarrollo" });

    return setTicket;
    
}

module.exports= updateInfoTicketByuser
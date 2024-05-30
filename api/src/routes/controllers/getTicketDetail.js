const { Ticket, User, Proveedornote, Proveedor, Workernote } = require('../../bd');

const getTicketDetail = async (id) => {
    
    try {
        let ticketDetail = await Ticket.findOne({
            where:{ id : id }, 
            include:[{
                model:User,
                attribute:["username"]
            },
            {
                model: Proveedornote,
                required : false, // trae solo si existe una nota asociada, sino no adjunta nada
                include: [{
                    model: Proveedor,
                    attribute:["name"]
                }] 
            },
            {
                model:Workernote,
                required : false
            }
            ]
        });
        return ticketDetail;
    } catch (e) {
        console.log("Error en controllers/getTicketdetail.js" , e.message)
    }
}



module.exports = getTicketDetail;
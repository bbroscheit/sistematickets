const { Ticket, User, Proveedornote, Proveedor, Workernote, Sector } = require('../../bd');

const getTicketDetail = async (id) => {
    //console.log("id en controller", id)
    
    try {
        let ticketDetail = await Ticket.findOne({
            where:{ id : id }, 
            include:[{
                model:User,
                attribute:["username"],
                include: [{
                    model: Sector,
                    attribute: ["sectorname"]
                }]
                
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
        //console.log("ticketDetail en controller ticket", ticketDetail)
        return ticketDetail;
    } catch (e) {
        console.log("Error en controllers/getTicketdetail.js" , e.message)
    }
}



module.exports = getTicketDetail;
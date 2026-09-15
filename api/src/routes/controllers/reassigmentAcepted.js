const { Ticket, Workernote, sequelize } = require('../../bd')
const sendTelegramMessage = require('../helpers/sendTelegramMessage')
const { TELEGRAMCHATID } = process.env

const reassigmentAcepted = async (id, name, description) => {
    let lastWorker = ""
    let newNote 
    let newWorker = name
    let ticket = await Ticket.findOne( { where: { id:id } , include: [{ model: Workernote }] });  
    
    try {
            
            if(ticket){
                
                lastWorker = ticket.worker
                await Ticket.update(
                    { 
                        worker: name , 
                        state: "Asignado",
                        created: sequelize.literal('CURRENT_TIMESTAMP')
                    },
                    { where: { id:id } } )

                if(ticket.workernote){
                        newNote = ticket.workernote;
                        newNote.lastuser = lastWorker;
                        newNote.newuser = newWorker;
                        newNote.description = `${newNote.description}\n\n${lastWorker}\n${description}`; // Concatena la nueva descripción
                        await newNote.save();

                        
                } else {
                        newNote = await Workernote.create({
                        lastuser: lastWorker,
                        newuser: newWorker,
                        description: `${lastWorker}\n${description}`
                    })

                    
                    await newNote.setTicket(ticket.id)

                    }
                    
                
                if(Ticket){
                    const telegramChatId = TELEGRAMCHATID;
                    const telegramMessage = `${name} , el usuario ${lastWorker} te ha re-asignado el soporte: N° ${id} `;
                    // no bloqueamos la respuesta si Telegram tarda o falla
                    sendTelegramMessage(telegramChatId, telegramMessage).catch(e => console.log("error al enviar telegram en reassigmentAcepted", e.message));
                }
                
                await ticket.reload({ include: [{ model: Workernote }] });
                    
                return newNote
            }            
            

      } catch (error) {
        console.log(" error en controller reassigmentAcepted ", error.message);
      }
        
}

module.exports= reassigmentAcepted
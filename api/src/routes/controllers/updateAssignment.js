const { Ticket, sequelize } = require('../../bd')
const { TELEGRAMCHATID } = process.env
const sendTelegramMessage = require('../helpers/sendTelegramMessage')

const updateAssignment = async (id, name) => {
    let setTicket = await Ticket.update(
        { worker: name , state: "Asignado",created: sequelize.literal('CURRENT_TIMESTAMP') },
        { where: { id:id } } 
      );
    
    if(setTicket){
      const telegramChatId = TELEGRAMCHATID;
      const telegramMessage = `${name} Se te ha asignado el soporte: N° ${id}`;
      // no bloqueamos la respuesta si Telegram tarda o falla
      sendTelegramMessage(telegramChatId, telegramMessage).catch(e => console.log("error al enviar telegram en updateAssignment", e.message));
    }


    return setTicket
    
}

module.exports= updateAssignment
const { Ticket, Workernote, sequelize } = require('../../bd')

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

                
                await ticket.reload({ include: [{ model: Workernote }] });
                    
                return newNote
            }            
            

      } catch (error) {
        console.log(" error en controller reassigmentAcepted ", e.message);
      }
        
}

module.exports= reassigmentAcepted
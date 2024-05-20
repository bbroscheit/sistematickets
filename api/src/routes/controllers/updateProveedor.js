const { Ticket, Proveedor, Proveedornote } = require('../../bd'); 

const updateProveedor = async ( id , name, description ) => {
   
    try {
        // Buscamos ticket por id
        const ticket = await Ticket.findByPk(id);
    
        if (!ticket) {
          return res.status(404).json({ error: 'Ticket no encontrado' });
        }
    
        // Buscamos proveedor por su nombre
        const proveedor = await Proveedor.findOne({ where: { name : name } });
    
        if (!proveedor) {
          return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        let newNote = await Proveedornote.create({
            description: description,
            state:"comenzado"
        })

        await newNote.setProveedor(proveedor)
        await newNote.setTicket(ticket)
    
        return newNote

      } catch (error) {
        console.log("Error en la ruta selectProveedor:", error.message);
        
      }
    
}

module.exports= updateProveedor
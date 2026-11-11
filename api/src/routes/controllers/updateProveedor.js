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
            state:"Comenzado"
        })

        await newNote.setProveedor(proveedor)
        await newNote.setTicket(ticket)

        // mientras la resolucion esta en manos de un proveedor externo, el
        // ticket no debe quedar como "Desarrollo" (que implica que lo esta
        // trabajando el equipo interno)
        await ticket.update({ state: "Terceros" })

        return newNote

      } catch (error) {
        console.log("Error en la ruta selectProveedor:", error.message);
        
      }
    
}

module.exports= updateProveedor
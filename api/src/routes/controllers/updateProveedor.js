const { Ticket, Proveedor, Proveedornote } = require('../../bd'); 

// le asigna un proveedor externo al ticket: crea la nota y manda el
// ticket a "Terceros" (vuelve a "Desarrollo" cuando se cierra la nota,
// ver closeProveedor.js)
const updateProveedor = async ( id , name, description ) => {

    try {
        // Buscamos ticket por id
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
          // esto usaba "res" (no existe en esta funcion, no es un
          // controller de express) y tiraba su propio ReferenceError en
          // vez de devolver el mensaje real - lo cambio por un throw como
          // en el resto de los controllers
          throw new Error('Ticket no encontrado');
        }

        // Buscamos proveedor por su nombre
        const proveedor = await Proveedor.findOne({ where: { name : name } });

        if (!proveedor) {
          throw new Error('Proveedor no encontrado');
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
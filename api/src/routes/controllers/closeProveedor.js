const { Proveedornote } = require ('../../bd');

const updateProveedorNote = async ( id ) => {

    try{
        let updateNote = await Proveedornote.findByPk(id)

        if(updateNote)
            {
                await Proveedornote.update({ state : "Terminado" },{ where: { id : id } })

                // termino el trabajo del proveedor externo - el ticket vuelve a
                // "Desarrollo", de nuevo en manos del equipo interno
                const ticket = await updateNote.getTicket();
                if (ticket) await ticket.update({ state: "Desarrollo" });
            }

        return updateNote;

    }catch(e){
        console.log( "error en controller closeProveedor", e.message);
    }
}

module.exports = updateProveedorNote;
const { Proveedornote } = require ('../../bd');

const updateProveedorNote = async ( id ) => {
    
    try{
        let updateNote = await Proveedornote.findByPk(id)
        
        if(updateNote)
            {
                await Proveedornote.update({ state : "Terminado" },{ where: { id : id } })
            }

        return updateNote;

    }catch(e){
        console.log( "error en controller closeProveedor", e.message);
    }
}

module.exports = updateProveedorNote;
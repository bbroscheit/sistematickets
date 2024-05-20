const { Proveedornote } = require('../../bd');

const getAllNotes = async() => {
    try {
        let allNotes = await Proveedornote.findAll({
            where: { isdelete:false },
        }); 
        
        return allNotes
    } catch (e) {
        console.log( "error en controller getAllNotes", e.message)
    }
}

module.exports = getAllNotes;
const { Newtask } = require('../../bd')

// detalle de una tarea V2 puntual
const getTaskById = async (id) => {
    try {
        let getDetail = await Newtask.findOne({
            where: [{ isdelete : false},{ id : id}],
            
        })

        return getDetail

    } catch (e) {
        console.log("error en ruta getTaskById", e.message)
    }
}

module.exports = getTaskById
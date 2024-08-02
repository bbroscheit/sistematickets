const { Schedule } = require('../../bd');

const deleteSchedule = async (id) => {
    try{
        const deleteSchedule = await Schedule.findByPk(id)
        await deleteSchedule.update(
            { isdelete: true },
            { where: {id:id}}
        )
        return deleteSchedule
    }catch(e){
        console.log( "error en controller deleteSchedule" , e.message)
    }
}

module.exports = deleteSchedule;
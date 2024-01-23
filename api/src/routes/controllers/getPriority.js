const { Priority } = require('../../bd');

const getPriority = async () => {
    try{
        let prioridades = await Priority.findAll({ where: { isdelete : false}});

        
        console.log( "getPriority" , prioridades)
        // return prioridades;
    }catch(e){
        console.log( "error en controller getPriority" , e.message)
    }
}

module.exports = getPriority;
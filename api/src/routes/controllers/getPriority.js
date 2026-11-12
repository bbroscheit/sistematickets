const { Priority } = require('../../bd');

// esto esta roto: el return quedo comentado, asi que esta funcion siempre
// devuelve undefined. la ruta /priority de ticketRouter.js por lo tanto
// nunca anda. lo dejo documentado pero no lo toco porque no se pidio
// arreglarlo
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
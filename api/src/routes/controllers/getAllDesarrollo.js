const { Desarrollo , User, Ticket} = require('../../bd');

// trae todos los desarrollos internos activos, con los usuarios
// asignados y los tickets que se le fueron linkeando
const getAllDesarrollo = async () => {
    try{
        let getDesarrollo = await Desarrollo.findAll({
            where: { isdelete : false},
            include: [
                {
                    model: User,
                    as: 'users', // Usa el alias para la asociación de users
                    attributes: ['id', 'firstname', 'lastname', 'username'] // Campos que deseas incluir del modelo User
                },
                {
                    model: Ticket,
                    as: 'tickets',
                    include:[{
                        model: User
                    }]
                }
            ]
        });

        getDesarrollo.sort((a , b) => { return a.id - b.id })

        return getDesarrollo;
    }catch(e){
        console.log( "error en controller getAllDesarrollo" , e.message)
    }
}

module.exports = getAllDesarrollo;
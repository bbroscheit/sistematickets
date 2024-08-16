const { Capacitation, User} = require('../../bd');

const getAllCapacitation = async () => {
    try{
        let getCapacitation = await Capacitation.findAll({
            where: {state : "Generado"},
            include: [
                {
                    model: User,
                    as: 'teacher', // Usa el alias para la asociación de teacher
                    attributes: ['id', 'firstname', 'lastname'] // Campos que deseas incluir del modelo User
                },
                {
                    model: User,
                    as: 'student', // Usa el alias para la asociación de students
                    attributes: ['id', 'firstname', 'lastname'] // Campos que deseas incluir del modelo User
                }
            ]
        });

        getCapacitation.sort((a , b) => { return a.id - b.id })

        return getCapacitation;
    }catch(e){
        console.log( "error en controller getAllCapacitation" , e.message)
    }
}

module.exports = getAllCapacitation;
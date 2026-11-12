const { Capacitation, User } = require('../../bd');

// trae las capacitaciones ya terminadas donde este developer fue el
// teacher (profesor)
const getCapacitationByWorker = async (workerName) => {
    
    try{

        let getCapacitationByName = await Capacitation.findAll({
            where: { state: "Terminado"},
            include:[{
                
                model:User,
                as: 'teacher',
                where:{ username : workerName },
            }]
        });

        getCapacitationByName ? getCapacitationByName.sort((a , b) => { return a.id - b.id }) : getCapacitationByName = 0
        
        
        return getCapacitationByName;
    }catch(e){
        console.log( "error en controller getCapacitationByName" , e.message)
    }
}

module.exports = getCapacitationByWorker
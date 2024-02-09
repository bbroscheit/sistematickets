const getLastQuestion = async (ticket) => {
    
    try{
        let question = ticket.detail.split('\n').filter(oracion => oracion.trim() !== '');

        // Obtiene la última oración del array
        let lastQuestion = question[question.length - 2];
        
        return lastQuestion;
    }catch(e){
        console.log( "error en helper getLastQuestion " , e.message)
    }
}

module.exports = getLastQuestion 
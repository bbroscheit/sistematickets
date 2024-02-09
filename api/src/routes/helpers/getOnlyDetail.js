const getOnlyDetail= async (ticket) => {
    
    try{
        let allDetail = ticket.detail.split('\n').filter(oracion => oracion.trim() !== '');

        // Obtiene la última oración del array
        let detail = allDetail[0].trim()
        
        return detail;
    }catch(e){
        console.log( "error en helper getOnlyDetail " , e.message)
    }
}


module.exports = getOnlyDetail 
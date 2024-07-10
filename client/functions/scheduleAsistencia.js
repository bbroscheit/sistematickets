export default function scheduleAsistencia(soporte , username ,firstname, lastname){
    
    for (let i = 0; i < soporte.invited.length; i++) {
        if(soporte.invited[i] === username){
            return true
        } else if (soporte.accepted[i].include(firstname) && soporte.accepted[i].include(lastname)){
            return true
        }         
    }

      return false
 }   
    
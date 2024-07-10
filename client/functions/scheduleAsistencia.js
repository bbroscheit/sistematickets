export default function scheduleAsistencia(soporte , username ,firstname, lastname){
    if(soporte.accepted == []){
        return false
    }else {
        for (let i = 0; i < soporte.accepted.length; i++) {
        if(soporte.accepted[i] === username){
            return true
        } else if (soporte.accepted[i].include(firstname) && soporte.accepted[i].include(lastname)){
            return true
        }         
    }
    }
    

      return false
 }   
    
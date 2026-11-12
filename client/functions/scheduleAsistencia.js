// dice si el usuario ya confirmo asistencia a un turno de agenda (esta en
// el array "accepted" por username o por nombre+apellido)
export default function scheduleAsistencia(soporte , username ,firstname, lastname){
    let acceptedArray = soporte.accepted

    if(acceptedArray === 0){
        return false
    }else {
        for (let i = 0; i < acceptedArray.length; i++) {
        if(acceptedArray[i] === username){
            return true
        } else if (acceptedArray[i].includes(firstname) && acceptedArray[i].includes(lastname)){
            return true
        }         
    }
    }
    

      return false
 }   
    
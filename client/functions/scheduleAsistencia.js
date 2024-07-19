export default function scheduleAsistencia(soporte , username ,firstname, lastname){
    let acceptedArray = soporte.accepted
    
    console.log("acceptedArray" , acceptedArray)

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
    
 export default function (soportes , usuario){
    
    let filteredSoportes = []
        for( let i = 0 ; i < soportes.length ; i++ ){
            if ( soportes[i].user.username === usuario ){
                filteredSoportes.push(soportes[i])
                
            }
        }
    
      return filteredSoportes
 }   
    
    
    
    
    
    
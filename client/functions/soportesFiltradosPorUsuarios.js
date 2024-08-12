 export default function (soportes , usuario, state ){
    
    let filteredSoportes = []
        for( let i = 0 ; i < soportes.length ; i++ ){
            if ( soportes[i].user.username === usuario && soportes[i].state === state ){
                filteredSoportes.push(soportes[i])
                
            }
        }
        
        filteredSoportes = filteredSoportes.sort((a , b) => { return a.id - b.id })
    
      return filteredSoportes
 }   
    
    
    
    
    
    
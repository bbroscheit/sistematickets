export default function arrayDesarrollador(data) {
    let developers= data.map( e => e.worker)
    let arrayDevelopers = []
    
    for( let i=0 ; i < developers.length ; i++){

        let flag = arrayDevelopers.includes(developers[i])
        
        if(!flag){
            arrayDevelopers.push(developers[i])
        }

        i++
        
    }
    
  return arrayDevelopers
}
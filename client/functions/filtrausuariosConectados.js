export default function getFileName(data) {
    
    let activity = data.map(e => e.USERID.trim())
    
    let usuariosObligatorios = [
        "ROSARIO1",
        "CHILE1",
        "FACTURACION1",
        
      ];
    let usuarios = []
    let flag = 0

    for (let i = 0; i < usuariosObligatorios.length; i++) {
        for (let x = 0; x < data.length; x++) {
            if(usuariosObligatorios[i] == activity[x]){
              flag = flag + 1
            }  
            
        }
        
        if( flag > 0 ){
            flag = 0    
        }else{
           usuarios.push(usuariosObligatorios[i]) 
        }
        
        
    }

    return usuarios;
}
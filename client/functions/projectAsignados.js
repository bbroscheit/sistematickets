export function projectAsignados(project) {
    //console.log("project funcion" , project.state)
    let asignados = 0

    if( project.state == "failure"){ return asignados }
    
    asignados = project.filter( e => e.state ===  "creado")
    
    
    
    
  return asignados
  }
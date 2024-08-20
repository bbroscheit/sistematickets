export function projectFinalizados(project) {
  let finalizados = 0
  if( project.state == "failure"){ return finalizados }

  finalizados = project.filter ( e => e.state ===  "Finalizado")
    
    
  return finalizados
  }
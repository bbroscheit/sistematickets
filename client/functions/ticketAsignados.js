export function ticketAsignados(projectByWorker) {

    let asignados = projectByWorker.filter ( e => e.state ===  "Asignado")
    
    
  return asignados
  }
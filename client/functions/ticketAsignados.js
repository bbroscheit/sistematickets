// filtra la lista de soportes y deja solo los que estan en estado Asignado
export function ticketAsignados(projectByWorker) {

    let asignados = projectByWorker.filter ( e => e.state ===  "Asignado")
    
    
  return asignados
  }
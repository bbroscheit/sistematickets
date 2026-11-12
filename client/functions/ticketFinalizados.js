// filtra la lista de soportes y deja solo los que estan en estado Completado
export function ticketFinalizados(projectByWorker) {

    let completados = projectByWorker.filter ( e => e.state ===  "Completado")
    
    
  return completados
  }
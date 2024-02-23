export function ticketFinalizados(projectByWorker) {

    let completados = projectByWorker.filter ( e => e.state ===  "Completado")
    
    
  return completados
  }
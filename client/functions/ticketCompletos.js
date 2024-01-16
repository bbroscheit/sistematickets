export function ticketCompletos(projectByWorker) {

    let terminados = projectByWorker.filter ( e => e.state ===  "Terminado")
    
    
  return terminados
  }
  
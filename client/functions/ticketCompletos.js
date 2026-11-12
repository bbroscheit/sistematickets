// filtra la lista de soportes y deja solo los que estan en estado Terminado
export function ticketCompletos(projectByWorker) {

    let terminados = projectByWorker.filter ( e => e.state ===  "Terminado")
    
    
  return terminados
  }
  
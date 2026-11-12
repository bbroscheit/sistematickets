// filtra la lista de soportes y deja solo los que estan en estado Informacion
export function ticketMasInformacion(projectByWorker) {

    let masInfo = projectByWorker.filter ( e => e.state ===  "Informacion")
    
    
  return masInfo
  }
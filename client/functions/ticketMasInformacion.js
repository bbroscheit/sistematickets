export function ticketMasInformacion(projectByWorker) {

    let masInfo = projectByWorker.filter ( e => e.state ===  "Informacion")
    
    
  return masInfo
  }
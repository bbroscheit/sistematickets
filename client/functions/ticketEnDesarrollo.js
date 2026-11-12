// filtra la lista de soportes y deja solo los que estan en estado Desarrollo
export function ticketEnDesarrollo(projectByWorker) {

    let enDesarrollo = projectByWorker.filter ( e => e.state ===  "Desarrollo")
    
    
  return enDesarrollo
  }
  
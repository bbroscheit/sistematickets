export function ticketEnDesarrollo(projectByWorker) {

    let enDesarrollo = projectByWorker.filter ( e => e.state ===  "Desarrollo")
    
    
  return enDesarrollo
  }
  
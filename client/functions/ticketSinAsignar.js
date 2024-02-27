export function ticketSinAsignar(projectByWorker) {
    let sinAsignar = []

    projectByWorker !== null ? sinAsignar = projectByWorker.filter ( e => e.state ===  "sin asignar") : sinAsignar = [] 
    
  return sinAsignar
  }
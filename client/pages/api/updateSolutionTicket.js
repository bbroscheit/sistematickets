export async function updateSolutionTicket(id, solution) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateSolutionTicket/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(solution),      
    })
    const data = await res.json()
    
    return data
    
    
  }
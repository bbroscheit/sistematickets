export async function getTicketDetail(id) {
    
    const res = await fetch(`http://localhost:3001/ticketDetail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    
    return data
  }
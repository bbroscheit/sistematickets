export async function updateCloseTicket(id) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateCloseTicket/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
              
    })
    const data = await res.json()
    
    return data
    
    
  }
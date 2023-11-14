export async function updateInfoTicketByUser(id, info) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateInfoTicketByUser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),      
    })
    const data = await res.json()
    
    return data
    
    
  }
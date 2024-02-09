export async function updateInfoTicketByUser(id, answer) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateInfoTicketByUser/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateInfoTicketByUser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answer),      
    })
    const data = await res.json()
    
    return data
    
    
  }
export async function updateCheckStorie(id) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userstories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    
    return data
  }
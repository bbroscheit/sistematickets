export async function updateCheckStorie(id) {
    
    const res = await fetch(`http://localhost:3001/userstories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    
    return data
  }
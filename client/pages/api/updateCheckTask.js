export async function updateCheckTask(id) {
    
    const res = await fetch(`http://localhost:3001/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    
    return data
  }
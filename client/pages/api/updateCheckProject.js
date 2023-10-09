export async function projectChangeState(id) {
    
    const res = await fetch(`http://localhost:3001/project/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    
    return data
  }
export async function projectChangeState(id) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await res.json()
    
    return data
  }
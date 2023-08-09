export async function getSector() {
    const res = await fetch(`http://localhost:3001/sector`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    
    return data
  }
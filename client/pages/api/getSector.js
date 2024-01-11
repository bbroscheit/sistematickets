export async function getSector() {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    
    return data
  }
export async function postCapacitation(capacitation) {
  
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/capacitation`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/capacitation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',   
      },
      body: JSON.stringify(capacitation)
    })
    const data = await res.json()

    return data
  }
export async function postCapacitationFinish(input) {
  
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateCapacitations`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateCapacitations`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',   
      },
      body: JSON.stringify(input)
    })
    const data = await res.json()

    return data
  }
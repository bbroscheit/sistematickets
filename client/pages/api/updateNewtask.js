export async function updateNewtask(inputTask) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateNewtask`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateNewtask`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputTask),
    })

    const data = await res.json()
    
    return data
  }
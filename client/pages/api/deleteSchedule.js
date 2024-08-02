export async function deleteSchedule(id) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/deleteSchedule/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/deleteSchedule/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
              
    })
    const data = await res.json()
    
    return data

    
    
  }
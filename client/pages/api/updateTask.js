export async function updateTask(input) {
    //console.log("front", input)
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateTask`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateTask`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),      
    })
    const data = await res.json()
    
    return data
    
  }
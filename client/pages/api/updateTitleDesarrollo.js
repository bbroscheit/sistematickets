export async function updateTitleDesarrollo(input, id) {
    console.log("updateTitleDesarrollo", input, id);
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateTitleDesarrollo/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateTitleDesarrollo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),      
    })
    const data = await res.json()
    
    return data
    
  }
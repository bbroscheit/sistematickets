export async function updateStateDesarrollo(id) {
    //console.log("updateTitleDesarrollo", input, id);
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateStateDesarrollo/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateStateDesarrollo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(input),      
    })
    const data = await res.json()
    
    return data
    
  }
export async function updateProveedor(id, asignarProveedor) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/selectProveedor/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/selectProveedor/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asignarProveedor),      
    })
    const data = await res.json()
    
    return data
    
  }
export async function closeProveedor(id) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedornote/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedornote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
           
    })
    const data = await res.json()
    
    return data
    
    
  }
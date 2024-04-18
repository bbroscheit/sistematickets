export async function postProveedor(inputProveedor) {
  
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedor`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputProveedor)
    })
    const data = await res.json()
    
    return data
  }
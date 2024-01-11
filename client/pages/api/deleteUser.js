export async function deleteUser(id) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/deleteUser/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/deleteUser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
              
    })
    const data = await res.json()
    
    return data

    
    
  }
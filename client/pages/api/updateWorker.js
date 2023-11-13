export async function updateWorker(asignar) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asignar),      
    })
    const data = await res.json()
    
    return data
    
  }
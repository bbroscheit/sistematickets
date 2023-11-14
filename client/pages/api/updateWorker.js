export async function updateWorker(id, asignar) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateAssignment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asignar),      
    })
    const data = await res.json()
    
    return data
    
  }
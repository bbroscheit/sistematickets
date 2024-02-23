export async function updateCheckTask(idTask) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newtask/${idTask}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newtask/${idTask}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
      
    })
    const data = await res.json()
    
    return data
  }
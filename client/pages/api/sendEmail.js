export async function sendEmail() {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    const data = await res.json()
    
    return data
  }
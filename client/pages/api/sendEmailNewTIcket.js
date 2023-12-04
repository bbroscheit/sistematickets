export async function sendEmailNewTicket(email) {
    // console.log(email)
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sendEmailNewTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    })
    const data = await res.json()
    
    return data
  }
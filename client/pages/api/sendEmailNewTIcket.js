export async function sendEmailNewTicket(input) {
    // console.log(email)
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sendEmailNewTicket`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sendEmailNewTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
    const data = await res.json()
    
    return data
  }
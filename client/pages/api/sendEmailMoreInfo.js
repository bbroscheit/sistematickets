export async function sendEmailMoreInfo(email) {
    // console.log(email)
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sendEmailMoreInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    })
    const data = await res.json()
    
    return data
  }
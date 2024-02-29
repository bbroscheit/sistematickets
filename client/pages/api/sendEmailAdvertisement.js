export async function sendEmailAdvertisement(advertisement) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sendEmailAdvertisement`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sendEmailAdvertisement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(advertisement),
    })
    const data = await res.json()
    
    return data
  }
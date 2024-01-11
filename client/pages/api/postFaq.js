export async function postFaq(inputFaq) {
  
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputFaq)
    })
    const data = await res.json()

    return data
    
  }
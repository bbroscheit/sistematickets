export async function postSalepoint(input) {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })
    const data = await res.json()
    
    return data
  }
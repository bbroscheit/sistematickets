export async function postTicket(input) {
  console.log("input",input)
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })
    const data = await res.json()

    return data
  }
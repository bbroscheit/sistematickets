export async function postTicket(input) {
<<<<<<< HEAD
  // console.log("input",input)
=======
  // console.log("input", input)
>>>>>>> 6ca68fe5e624c8acd0b13a6e750ec3822d9404da
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
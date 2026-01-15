export async function postSchedule(input) {
    console.log("entre a postSchedule api" , input)
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedule`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })
    const data = await res.json()
    
    return data
  }
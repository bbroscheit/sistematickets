export async function postSector(input) {
    console.log(input)
    const res = await fetch(`http://localhost:3001/sector`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    })
    const data = await res.json()
    
    return data
  }
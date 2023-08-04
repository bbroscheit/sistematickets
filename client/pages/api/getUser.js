export async function getUser(input) {
  const res = await fetch(`http://localhost:3001/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input)
  })
  const data = await res.json()
  
  return data
}

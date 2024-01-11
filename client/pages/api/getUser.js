export async function getUser(input) {
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/login`, {
    // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input)
  })
  const data = await res.json()
  
  return data
}

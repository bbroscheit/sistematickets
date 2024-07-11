export async function toggleAccepted(id, user, firstname , lastname) {
    let userData = {
        user : user,
        firstname : firstname,
        lastname : lastname
    }
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/toggleAccepted/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/toggleAccepted/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      
    //   method: 'POST',
    //     body: userData
              
    })
    const data = await res.json()
    
    return data
    
    
  }
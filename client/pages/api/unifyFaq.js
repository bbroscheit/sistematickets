export async function unifyFaq(id, filterFaq) {
    
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/unifyFaq/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterFaq),      
    })
    const data = await res.json()
    
    return data

    
    
  }
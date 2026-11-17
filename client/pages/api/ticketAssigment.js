// marca el soporte como "en desarrollo" cuando el worker arranca a
// trabajarlo, junto con la fecha aproximada de terminacion que cargo en el
// modal (PUT /ticketAssignment/:id)
export async function ticketAssigment(id, estimatedfinishdate) {
    console.log("ticketAssigment", id)
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAssignment/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAssignment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estimatedfinishdate }),
    })
    const data = await res.json()

    return data


  }
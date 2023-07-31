export const getAllTicket = async () =>  {;
    try {
        const res = await fetch(`http://localhost:3001/ticket`)
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
}
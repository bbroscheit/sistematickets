export const getUser = async (input) =>  {;
    try {
        console.log("soy getUser",input)
        const res = await fetch(`http://localhost:3001/user`, input)
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
}
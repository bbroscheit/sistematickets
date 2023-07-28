// import axios from "axios";

// const getAllTicket = async () => {
//     const allTickets = axios.get('http://localhost:3001/ticket')
//                         // .then((res) => res.json())
//                         // .then( allTickets = res.data )
//                         console.log("alltickets", allTickets.data)
//                         return allTickets;
// }



// module.exports = getAllTicket

// export default getAllTicket = async () => {
//     const allTickets = await fetch('http://localhost:3001/ticket')
//                         .then((res) => res.json())
//                         // .then( allTickets = res.data )
//                         console.log("alltickets", allTickets.data)
//                         return allTickets;
// }

// async function  getAllTicket() {
//     const allTickets =  await fetch('http://localhost:3001/ticket')
//                         .then((res) => res.json())
//                         // .then( allTickets = res.data )
//                         console.log("alltickets", allTickets.data)
//                         return allTickets;
// }

// export default getAllTicket

export const getAllTicket = async () =>  {;
    try {
        const res = await fetch(`http://localhost:3001/ticket`)
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
    }
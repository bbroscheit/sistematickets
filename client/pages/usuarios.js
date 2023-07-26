// import { useState, useEffect } from 'react'
 
// function Usuarios() {
//   const [data, setData] = useState(null)
//   const [isLoading, setLoading] = useState(true)
 
//   useEffect(() => {
//     fetch('http://localhost:3001/ticket')
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data)
//         setLoading(false)
//         console.log("data usuarios", data)
//       })
//   }, [])
 
//   if (isLoading) return <p>Loading...</p>
//   if (!data) return <p>No profile data</p>
 
//   return (
//     <div>
//       <h1>{data[0]}</h1>
//       <p>titulo2</p>
//     </div>
//   )
// }

// export default Usuarios;

import React from 'react'
import { useState, useEffect } from 'react'



function usuarios() {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/ticket')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            console.log("data usuarios", data)
          })
      }, [])

  return (
    <div>
      {data && data.map( ( e ) => <h1>{e.id}</h1>)}
    </div>
  )
}

export default usuarios
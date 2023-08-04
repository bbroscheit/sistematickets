import React from 'react'
import { useState, useEffect } from 'react'
import { getAllTickets } from '../actions/getAllTickets'


function usuarios() {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/ticket')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
          })
         
      }, [])

  return (
    <div>
      {data && data.map( ( e ) => <h1 key={e.id}>{e.id}</h1>)}
    </div>
  )
}

export default usuarios
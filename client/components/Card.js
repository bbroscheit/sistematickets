import React from 'react'

function Card({id,subject}) {
  return (
    <div>
        <h3>{id}</h3>
        <h3>{subject}</h3>
    </div>
  )
}

export default Card
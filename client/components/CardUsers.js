import React from 'react'

function CardUsers({username, sector, salepoint}) {
  return (
    <div>
        <h3>{username}</h3>
        <h4>{sector}</h4>
        <h4>{salepoint}</h4>
    </div>
  )
}

export default CardUsers
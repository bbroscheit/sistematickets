import React from 'react'

function CardUsers({ sector, salepoint}) {
  return (
    <div>
        <h3>{sector}</h3>
        <h4>{salepoint}</h4>
    </div>
  )
}

export default CardUsers
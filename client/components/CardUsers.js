import React from 'react'

function CardUsers({username, sector, salepoint}) {
  
  return (
    <div>
        <h3>{username}</h3>
        <h4>{sector ? sector.sectorname : "no hay datos"}</h4>
        <h4>{salepoint ? salepoint.salepoint : "no hay datos"}</h4>
    </div>
  )
}

export default CardUsers
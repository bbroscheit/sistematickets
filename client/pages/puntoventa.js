import React from 'react'
import { useState, useEffect } from 'react'
import mainStyles from '../styles/Home.module.css'
import CardSalepoint from '@/components/CardSalepoint'


function Sector() {

    const [salepoint, setSalepoint] = useState(null)

    let hardcoreSalepoint = [{
      id : 1,
      salepoint: "buenos aires"
    },{
      id : 2,
      salepoint: "Neuquen"
    },{
      id : 3,
      salepoint: "Rosario"
    }]

    return (
    <div className={mainStyles.container}>
      <h1>Sector</h1>
      <div>
        <div>
          <h3>Busqueda de Sector</h3>
          <input type="search" />
        </div>
        <div>
          {hardcoreSalepoint && hardcoreSalepoint.map( e => <CardSalepoint salepoint={e.salepoint} />)}
        </div>
      </div>
    </div>
  )
}

export default Sector
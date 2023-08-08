import React from 'react'
import { useState, useEffect } from 'react'
import mainStyles from '../styles/Home.module.css'
import CardSector from '@/components/CardSector'


function Sector() {

    const [sector, setSector] = useState(null)

    let hardcoreSector = [{
      id : 1,
      sector: "Administracion",
      salepoint: "buenos aires"
    },{
      id : 2,
      sector: "Tesoreria",
      salepoint: "buenos aires"
    },{
      id : 3,
      sector: "Cobranzas",
      salepoint: "buenos aires"
    },{
      id : 4,
      sector: "Administracion",
      salepoint: "Neuquen"
    },{
      id : 5,
      sector: "Cobranzas",
      salepoint: "Neuquen"
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
          {hardcoreSector && hardcoreSector.map( e => <CardUser sector={e.sector} salepoint={e.salepoint} />)}
        </div>
      </div>
    </div>
  )
}

export default Sector
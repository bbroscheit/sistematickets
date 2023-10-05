import React from 'react'
import { useState, useEffect } from 'react'
import mainStyles from '../styles/Home.module.css'
import CardSalepoint from '@/components/CardSalepoint'


function Sector() {

    const [salepoint, setSalepoint] = useState(null)

    useEffect(() => {
      fetch("http://localhost:3001/salepoint")
        .then((res) => res.json())
        .then((data) => {
          setSalepoint(data);
        });
        
    }, []);


    return (
    <div className={mainStyles.container}>
      <h1>Sector</h1>
      <div>
        <div>
          <h3>Busqueda de Sector</h3>
          <input type="search" />
        </div>
        <div>
          { salepoint !== null && salepoint.length > 0 ? 
              salepoint.map( e => <CardSalepoint salepoint={e.salepoint} />) : 
              null
          }
        </div>
      </div>
    </div>
  )
}

export default Sector
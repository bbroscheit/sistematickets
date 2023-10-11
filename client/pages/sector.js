import React from 'react'
import { useState, useEffect } from 'react'
import mainStyles from '../styles/Home.module.css'
import CardSector from '@/components/CardSector'


function Sector() {

    const [sector, setSector] = useState(null)

    useEffect(() => {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`)
        .then((res) => res.json())
        .then((data) => {
          setSector(data);
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
          {sector && sector.map( e => <CardSector sectorname={e.sectorname} />)}
        </div>
      </div>
    </div>
  )
}

export default Sector
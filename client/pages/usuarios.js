import React from 'react'
import { useState, useEffect } from 'react'
import mainStyles from '../styles/Home.module.css'
import CardUser from '@/components/CardUsers'


function usuarios() {

    const [user, setUser] = useState(null)

    let hardcoreUser = [{
      id : 1,
      username : "username1",
      sector: "Administracion",
      salepoint: "buenos aires"
    },{
      id : 2,
      username : "username2",
      sector: "Tesoreria",
      salepoint: "buenos aires"
    },{
      id : 3,
      username : "username3",
      sector: "Cobranzas",
      salepoint: "buenos aires"
    },{
      id : 4,
      username : "username4",
      sector: "Administracion",
      salepoint: "Neuquen"
    },{
      id : 5,
      username : "username5",
      sector: "Cobranzas",
      salepoint: "Neuquen"
    }]

    return (
    <div className={mainStyles.container}>
      <h1>Usuarios</h1>
      <div>
        <div>
          <h3>Busqueda por usuario</h3>
          <input type="search" />
        </div>
        <div>
          <h3>Filtro por Sector</h3>
          <select>
            <option>Adminstracion</option>
            <option>Tesoreria</option>
            <option>Cobranzas</option>
          </select>
        </div>
        <div>
          <h3>Filtro por Unidad de Negocio</h3>
          <select>
            <option>Buenos Aires</option>
            <option>Neuquen</option>
          </select>
        </div>
        <div>
          {hardcoreUser && hardcoreUser.map( e => <CardUser username={e.username} sector={e.sector} salepoint={e.salepoint}/>)}
        </div>
      </div>
    </div>
  )
}

export default usuarios
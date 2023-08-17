import React from 'react'
import { useState, useEffect } from 'react'
import mainStyles from '../styles/Home.module.css'
import CardUser from '@/components/CardUsers'


function usuarios() {

    const [user, setUser] = useState(null)

    useEffect(() => {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

    console.log("user en usuarios",user)

    return (
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>Usuarios</h1>
      <div>
        <div>
          <h3>Busqueda por usuario</h3>
          <input type="search" />
        </div>
        <div >
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
        </div>kkk
        <div>
          {user && user.map( e => <CardUser key={e.id} username={e.username} sector={e.sector} salepoint={e.salepoint}/>)}
        </div>
      </div>
    </div>
  )
}

export default usuarios
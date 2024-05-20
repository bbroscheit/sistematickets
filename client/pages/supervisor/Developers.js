import React, { useState, useEffect } from 'react'
import style from '@/modules/developers.module.css'
import arrayDesarrollador from '@/functions/arrayDesarrollador'
import CardDeveloper from '@/components/CardDeveloper';


function Developers() {
  const [ soportes , setSoportes ] = useState(null)
  const [ desarrollador, setDesarrollador ] = useState(null)

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDeveloperView`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDeveloperView`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
        setDesarrollador(arrayDesarrollador(data))
      });
  },[]);

  return (
    <div className={style.container}>
      {
        soportes && soportes.length > 0 ?
          desarrollador.map( e => <CardDeveloper name={e} /> ) : <h2>Loading...</h2>
      }
    </div>
  )
}

export default Developers
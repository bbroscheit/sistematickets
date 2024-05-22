import React, { useState, useEffect } from 'react'
import CardTicketDeveloper from './CardTicketDeveloper';
import style from '@/modules/cardDeveloper.module.css';

function CardDeveloper({sector}) {
    const [soporte, setSoporte] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsupervisorView/${sector}`)
          // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsupervisorView/${sector}`)
          .then((res) => res.json())
          .then((data) => {
            setSoporte(data);
            
          });
    },[]);

    console.log("soporte" ,soporte)
    
  return (
    <div className={style.container}>
        <h2>{sector}</h2>
        {/* {
            soporte && soporte.length > 0 ?
                soporte.map( e => <CardTicketDeveloper id={e.id} state={e.state} subject={e.subject} user={e.user}/>) : null
        } */}

        
    </div>
  )
}

export default CardDeveloper
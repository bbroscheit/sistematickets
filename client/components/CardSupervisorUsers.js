import React, { useState, useEffect } from 'react'
import CardTicketDeveloper from './CardTicketDeveloper';
import style from '@/modules/cardDeveloper.module.css';
import CardTicketUser from './CardTicketUser';

function CardSupervisorUsers({sector}) {
    const [soporte, setSoporte] = useState(null)
    const [ supervisorSector, setSupervisorSector ] = useState(null)

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setSupervisorSector(loginParse.sector);
  }, []);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketSupervisorData?sector=${sector}`)
          // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketSupervisorView?sector=${sector}`)
          .then((res) => res.json())
          .then((data) => {
            setSoporte(data);
            
          });
    },[]);
    
    console.log("sectorSUpervisorUser", sector)
    console.log("soporteSupervisorUser", soporte)
  return (
    <div className={style.container}>
        <h2>{sector}</h2>
        {/* {
            soporte && soporte.length > 0 ?
                soporte.map( e => <CardTicketUser id={e.id} state={e.state} subject={e.subject} user={e.worker}/>) : null
        } */}

        
    </div>
  )
}

export default CardSupervisorUsers
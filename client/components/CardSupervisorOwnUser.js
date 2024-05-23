import React, { useState, useEffect } from 'react'
import style from '@/modules/cardSupervisorUers.module.css';
import CardTicketUser from './CardTicketUser';
import soportesFiltradosPorUsuarios from '@/functions/soportesFiltradosPorUsuarios';

function CardSupervisorOwnUser({soportes, usuario}) {
    const [soporteFiltrado, setSoporteFiltrado ] = useState(soportesFiltradosPorUsuarios(soportes, usuario))

  return (
    <div className={style.container}>
        <h2>{usuario}</h2>
        {
            soporteFiltrado && soporteFiltrado.length > 0 ?
                soporteFiltrado.map( e => <CardTicketUser id={e.id} state={e.state} subject={e.subject} worker={e.worker}/>) : null
        }

        
    </div>
  )
}

export default CardSupervisorOwnUser
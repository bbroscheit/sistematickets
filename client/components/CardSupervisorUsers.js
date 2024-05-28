import React, { useState, useEffect } from 'react'
import style from '@/modules/cardSupervisorUers.module.css';
import CardTicketUser from './CardTicketUser';
import soportesFiltradosPorUsuarios from '@/functions/soportesFiltradosPorUsuarios';

function CardSupervisorUsers({soportes, usuario , key}) {
    const [soporteFiltrado, setSoporteFiltrado ] = useState(soportesFiltradosPorUsuarios(soportes, usuario))

  return (
    <div className={style.container} key={key}>
        <h2>{usuario}</h2>
        {
            soporteFiltrado && soporteFiltrado.length > 0 ?
                soporteFiltrado.map( e => <CardTicketUser id={e.id} state={e.state} subject={e.subject} worker={e.worker} key={e.id}/>) : null
        }

        
    </div>
  )
}

export default CardSupervisorUsers
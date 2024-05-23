import React, { useState, useEffect } from 'react'
import CardTicketDeveloper from './CardTicketDeveloper';
import style from '@/modules/cardSupervisorUers.module.css';
import CardTicketUser from './CardTicketUser';
import arrayUser from '@/functions/arrayUser';
import soportesFiltradosPorUsuarios from '@/functions/soportesFiltradosPorUsuarios';

function CardSupervisorUsers({soportes, usuario}) {
    const [soporte, setSoporte] = useState(soportes)
    const [user, setUser] = useState(usuario)
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

export default CardSupervisorUsers
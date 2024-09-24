import React, { useState, useEffect } from 'react'
import style from '@/modules/cardSupervisorUers.module.css';
import styleCard from '@/modules/cardWorkerSupervisor.module.css'
import CardTicketUser from './CardTicketUser';
import soportesFiltradosPorUsuarios from '@/functions/soportesFiltradosPorUsuarios';

function CardSupervisorUsers({soportes, usuario , key}) {
    const [soporteFiltrado, setSoporteFiltrado ] = useState(soportesFiltradosPorUsuarios(soportes, usuario))
    const [soporteFiltradoSinAsignar, setSoporteFiltradoSinAsignar ] = useState(soportesFiltradosPorUsuarios(soportes, usuario, "sin asignar"))
    const [soporteFiltradoAsignado, setSoporteFiltradoAsignado ] = useState(soportesFiltradosPorUsuarios(soportes, usuario, "Asignado"))
    const [soporteFiltradoDesarrollo, setSoporteFiltradoDesarrollo ] = useState(soportesFiltradosPorUsuarios(soportes, usuario, "Desarrollo"))
    const [soporteFiltradoInformacion, setSoporteFiltradoInformacion ] = useState(soportesFiltradosPorUsuarios(soportes, usuario, "Informacion"))
    const [soporteFiltradoCompletado, setSoporteFiltradoCompletado ] = useState(soportesFiltradosPorUsuarios(soportes, usuario, "Completado"))

    //console.log("sportes",soporteFiltrado)
  return (
    <div className={styleCard.workerContainer} key={key}>
        <h2 className={styleCard.titleCard}>{usuario}</h2>
        <hr />
        {
            soporteFiltradoSinAsignar && soporteFiltradoSinAsignar.length > 0 ?
                <>
                  <h3 className={styleCard.subtitle}>Sin Asignar</h3>
                  {soporteFiltradoSinAsignar.map( e => <CardTicketUser id={e.id} created={e.createdAt} subject={e.subject} worker={e.worker} key={e.id}/>  ) }
                </>: null
                
        }
        {
            soporteFiltradoAsignado && soporteFiltradoAsignado.length > 0 ?
                <>
                  <h3 className={styleCard.subtitle}>Asignado</h3>
                  {soporteFiltradoAsignado.map( e => <CardTicketUser id={e.id} created={e.createdAt} subject={e.subject} worker={e.worker} key={e.id}/> ) }
                </>: null
                
        }
        {
            soporteFiltradoDesarrollo && soporteFiltradoDesarrollo.length > 0 ?
                <>
                  <h3 className={styleCard.subtitle}>En Desarrollo</h3>
                  {soporteFiltradoDesarrollo.map( e => <CardTicketUser id={e.id} created={e.createdAt} subject={e.subject} worker={e.worker} key={e.id}/> ) }
                </>: null
                
        }
        {
            soporteFiltradoInformacion && soporteFiltradoInformacion.length > 0 ?
                <>
                  <h3 className={styleCard.subtitle}>Informacion</h3>
                  {soporteFiltradoInformacion.map( e => <CardTicketUser id={e.id} created={e.createdAt} subject={e.subject} worker={e.worker} key={e.id}/> ) }
                </>: null
                
        }
        {
            soporteFiltradoCompletado && soporteFiltradoCompletado.length > 0 ?
                <>
                  <h3 className={styleCard.subtitle}>Completado</h3>
                  {soporteFiltradoCompletado.map( e =>  <CardTicketUser id={e.id} created={e.createdAt} subject={e.subject} worker={e.worker} key={e.id}/> ) }
                </>: null
                
        }

        
    </div>
  )
}

export default CardSupervisorUsers
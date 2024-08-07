import React,{useState, useEffect} from 'react'
import style from '@/modules/cardWorkerSupervisor.module.css'
import CardTicketSupervisor from './CardTicketSupervisor'

function CardWorkerSupervisor({worker,firstname,lastname}) {
    const [ asignados , setAsignados] = useState(null)
    const [ enDesarrollo , setEnDesarrollo ] = useState(null)
    const [ masInformacion , setMasInformacion ] = useState(null)
    const [ completado , setCompletado ] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByWorker/${worker}`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByWorker/${worker}`)
      .then((res) => res.json())
      .then((data) => {
        setAsignados(data.filter( e => e.state === "Asignado"));
        setEnDesarrollo(data.filter( e => e.state === "Desarrollo"));
        setMasInformacion(data.filter( e => e.state === "Informacion"));
        setCompletado(data.filter( e => e.state === "Completado"));
      });
    },[])

    
  return (
    <div className={style.workerContainer}>
        <h3 className={style.titleCard}>{firstname} {lastname}</h3>
        <hr />
        {
            asignados !== null && asignados.length > 0 ? 
                <>
                    <h5 className={style.subtitle}>Asignados</h5>
                    {
                        asignados.map( e => <CardTicketSupervisor key={e.id} id={e.id} subject={e.subject} created={e.createdAt} userFirstname={e.user.firstname} userLastname={e.user.lastname}/> )
                    }
                </> : null
        }

        {
            enDesarrollo !== null && enDesarrollo.length > 0 ? 
                <>
                    <h5 className={style.subtitle}>En Desarrollo</h5>
                    {
                        enDesarrollo.map( e => <CardTicketSupervisor key={e.id} id={e.id} subject={e.subject} created={e.createdAt} userFirstname={e.user.firstname} userLastname={e.user.lastname}/> )
                    }
                </> : null
        }

        {
            masInformacion !== null && masInformacion.length > 0 ? 
                <>
                    <h5 className={style.subtitle}>Información</h5>
                    {
                        masInformacion.map( e => <CardTicketSupervisor key={e.id} id={e.id} subject={e.subject} created={e.createdAt} userFirstname={e.user.firstname} userLastname={e.user.lastname}/> )
                    }
                </> : null
        }

        {
            completado !== null && completado.length > 0 ? 
                <>
                    <h5 className={style.subtitle}>Completado</h5>
                    {
                        completado.map( e => <CardTicketSupervisor key={e.id} id={e.id} subject={e.subject} created={e.createdAt} userFirstname={e.user.firstname} userLastname={e.user.lastname}/> )
                    }
                </> : null
        }

    </div>
  )
}

export default CardWorkerSupervisor
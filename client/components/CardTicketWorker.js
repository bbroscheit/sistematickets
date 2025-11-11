import React from 'react'
import { useRouter } from 'next/router';
import style from '@/modules/cardTicketWorker.module.css'
import { extraeFecha } from '@/functions/extraeFecha'

function CardTicketWorker({soportes}) {
  const router = useRouter();

  function idKeep(e) {
    
    const idSoporte = e.target.getAttribute("value");
    localStorage.setItem("idSoporte", JSON.stringify(idSoporte));
    
    router.push(`/soportes/[id]`, `/soportes/${idSoporte}`)
  }

  return (
    <div className={style.card}>
        {
            soportes.map((e) => <div className={style.cardContent} >
                <p onClick={ u => idKeep(u) } value={e.id}>{`N° ${e.id}`}</p>
                <p>{extraeFecha(e.createdAt)}</p>
                <p>{e.subject}</p>
                <p>{`${e.user.firstname} ${e.user.lastname}`}</p>
            </div>)
        }
        
    </div>
  )
}

export default CardTicketWorker


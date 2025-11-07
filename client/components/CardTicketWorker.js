import React from 'react'
import style from '@/modules/cardTicketWorker.module.css'
import { extraeFecha } from '@/functions/extraeFecha'

function CardTicketWorker({soportes}) {
    
  return (
    <div className={style.card}>
        {
            soportes.map((e) => <div className={style.cardContent}>
                <p>{`N° ${e.id}`}</p>
                <p>{extraeFecha(e.createdAt)}</p>
                <p>{e.subject}</p>
                
            </div>)
        }
        
    </div>
  )
}

export default CardTicketWorker
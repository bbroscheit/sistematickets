import React from 'react'
import { useRouter } from 'next/router';
import style from '@/modules/cardTicketSupervisor.module.css'
import { extraeFecha } from '@/functions/extraeFecha'


function CardTicketSupervisor({key , id , subject , created}) {
    const router = useRouter();

    function idKeep(e) {
        e.preventDefault();
        const idSoporte = id;
        localStorage.setItem("idSoporte", JSON.stringify(idSoporte));
    }

  return (
    <div key={key} className={style.cardContainer}>
        <h5 onClick={(e) => {
            idKeep(e);
            router.push(`/soportes/[id]`, `/soportes/${id}`);
          }}>N° {id}</h5>
        <h5 onClick={(e) => {
            idKeep(e);
            router.push(`/soportes/[id]`, `/soportes/${id}`);
          }}>{subject}</h5>
        <h5 onClick={(e) => {
            idKeep(e);
            router.push(`/soportes/[id]`, `/soportes/${id}`);
          }}>{extraeFecha(created)}</h5>
    </div>
  )
}

export default CardTicketSupervisor
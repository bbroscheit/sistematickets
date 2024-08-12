import React, { useState, useRef}  from 'react'
import { useRouter } from 'next/router';
import style from '@/modules/cardTicketDeveloper.module.css'
import styleCard from '@/modules/cardTicketSupervisor.module.css'
import { incialParaDesarrollador } from '@/functions/incialParaDesarrollador'
import { devuelveInicial } from '@/functions/devuelveInicial'
import { Tooltip } from '@mui/material'
import { extraeFecha } from '@/functions/extraeFecha';

function CardTicketUser({id , created , subject , worker, key}) {
  const router = useRouter();
  const [textPosition, setTextPosition] = useState(0);
  const intervalRef = useRef(null);

  function idKeep(e) {
    e.preventDefault();
    const idSoporte = id;
    localStorage.setItem("idSoporte", JSON.stringify(idSoporte));
  }

  function handleMouseEnter() {
    intervalRef.current = setInterval(() => {
        setTextPosition(prevPosition => (prevPosition + 1) % (subject.length + 1));
    }, 100); // Velocidad de desplazamiento (100ms)
  }

  function handleMouseLeave() {
    setTextPosition(0);
    clearInterval(intervalRef.current); // Limpiar el intervalo
  }

  return (
    <div key={key} className={styleCard.cardContainer}>
        <h5
          onClick={(e) => { idKeep(e); router.push(`/soportes/[id]`, `/soportes/${id}`);
          }}>N° {id}</h5>
        <h5 className={styleCard.subject}
            onClick={(e) => { idKeep(e); router.push(`/soportes/[id]`, `/soportes/${id}`) }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
              {subject.slice(textPosition, textPosition + 30)}
        </h5>
        <h5 onClick={(e) => {
            idKeep(e);
            router.push(`/soportes/[id]`, `/soportes/${id}`);
          }}>{extraeFecha(created)}</h5>
        <h5 
          className={styleCard.subject}
          onClick={(e) => { idKeep(e); router.push(`/soportes/[id]`, `/soportes/${id}`);}}
          
          >{`${worker}`}</h5>
    </div>
  )
}

export default CardTicketUser
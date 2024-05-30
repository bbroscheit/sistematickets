import React, { useState, useRef}  from 'react'
import { useRouter } from 'next/router';
import style from '@/modules/cardTicketDeveloper.module.css'
import { incialParaDesarrollador } from '@/functions/incialParaDesarrollador'
import { devuelveInicial } from '@/functions/devuelveInicial'
import { Tooltip } from '@mui/material'

function CardTicketUser({id , state , subject , worker, key}) {
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
    <div className={style.container} key={key} onClick={(e) => { idKeep(e); router.push(`/soportes/[id]`, `/soportes/${id}`) }}>
        <div className={style.firstLine}>
            <h4 >T {id}</h4>
            <div className={style.divEstados}>
                <Tooltip title= {`${state}`}>
                  <h4 className={style.estado}>{devuelveInicial(state)}</h4>
                </Tooltip>
                <Tooltip title= {`${worker}`}>
                  <h4 className={style.user}>{incialParaDesarrollador(worker)}</h4>
                </Tooltip>
            </div>
        </div>
        <h4 className={style.subject} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
              {subject.slice(textPosition, textPosition + 30)}
        </h4>
    </div>
  )
}

export default CardTicketUser
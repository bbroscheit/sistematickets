import React from 'react'
import { useRouter } from 'next/router';
import style from '@/modules/ticketsSupervisorV2.module.css'
import { extraeFecha } from '@/functions/extraeFecha'

function statePill(state) {
  switch (state) {
    case "sin asignar":
      return { label: "Sin asignar", cls: style.pillGray };
    case "Asignado":
      return { label: "Asignado", cls: style.pillBlue };
    case "Desarrollo":
      return { label: "Desarrollo", cls: style.pillAmber };
    case "Informacion":
      return { label: "Información", cls: style.pillPurple };
    case "Completado":
      return { label: "Completado", cls: style.pillGreen };
    case "Terminado":
      return { label: "Terminado", cls: style.pillGreen };
    default:
      return { label: state, cls: style.pillGray };
  }
}

function CardTicketWorkerV2({ soportes }) {
  const router = useRouter();

  function idKeep(idSoporte) {
    localStorage.setItem("idSoporte", JSON.stringify(idSoporte));
    router.push(`/soportes/v2/[id]`, `/soportes/v2/${idSoporte}`)
  }

  return (
    <div className={style.ticketRows}>
      {soportes.map((e) => {
        const pill = statePill(e.state);
        return (
          <div className={style.ticketRow} key={e.id} onClick={() => idKeep(e.id)}>
            <span className={style.ticketNum}>{`N° ${e.id}`}</span>
            <span className={style.ticketDate}>{extraeFecha(e.createdAt)}</span>
            <span className={style.ticketSubject}>{e.subject}</span>
            <span className={style.ticketRequester}>{`${e.user.firstname} ${e.user.lastname}`}</span>
            <span className={`${style.pill} ${pill.cls}`}>{pill.label}</span>
          </div>
        );
      })}
    </div>
  )
}

export default CardTicketWorkerV2

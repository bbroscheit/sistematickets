import React from "react";
import style from "../modules/cardInformacionWorker.module.css";

function CardInformacionWorker({ id, firstname, lastname, data }) {
  const nombreCompleto = `${firstname} ${lastname}`;

  return (
    <div className={style.card}>
      <h1 className={style.titulo}>{nombreCompleto}</h1>
      <div className={style.lineInfo}>
        <p>Total Ticket :</p>
        <span>{data ? data.totalTickets : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Asignados :</p>
        <span>{data ? data.asignados : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Desarrollo :</p>
        <span>{data ? data.desarrollo : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Información :</p>
        <span>{data ? data.informacion : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Completo :</p>
        <span>{data ? data.completado : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Terminado :</p>
        <span>{data ? data.terminado : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Hs Promedio :</p>
        <span>{data ? data.hsPromedio : 0}</span>
      </div>
    </div>
  );
}

export default CardInformacionWorker;

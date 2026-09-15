import React, { useState, useEffect } from "react";
import style from "../modules/ticketsSupervisorV2.module.css";

function CardInformacionGeneralV2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/informacionGeneral`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className={style.summaryStrip}>
      <div className={style.summaryTitle}>Información General</div>
      <div className={style.summaryStat}>
        <span className={style.n}>{data ? data.totalTickets : 0}</span>
        <span className={style.l}>Total</span>
      </div>
      <div className={style.summaryStat}>
        <span className={style.n}>{data ? data.sinAsignar : 0}</span>
        <span className={style.l}>Sin Asignar</span>
      </div>
      <div className={style.summaryStat}>
        <span className={style.n}>{data ? data.asignados : 0}</span>
        <span className={style.l}>Asignados</span>
      </div>
      <div className={style.summaryStat}>
        <span className={style.n}>{data ? data.desarrollo : 0}</span>
        <span className={style.l}>Desarrollo</span>
      </div>
      <div className={style.summaryStat}>
        <span className={style.n}>{data ? data.informacion : 0}</span>
        <span className={style.l}>Información</span>
      </div>
      <div className={style.summaryStat}>
        <span className={style.n}>{data ? data.completado : 0}</span>
        <span className={style.l}>Completo</span>
      </div>
      <div className={style.summaryStat}>
        <span className={style.n}>{data ? data.terminado : 0}</span>
        <span className={style.l}>Terminado</span>
      </div>
    </div>
  );
}

export default CardInformacionGeneralV2;

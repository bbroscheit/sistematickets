import React, { useState, useEffect } from "react";
import style from "../modules/cardInformacionWorker.module.css";

function CardInformacionWorker({ id , firstname , lastname}) {
  //console.log("CardInformacionWorker id:", id);
  const [data, setData] = useState(null);
  let nombreCompleto = `${firstname} ${lastname}`;

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/informacionWorker?id=${id}`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  return (
    <div className={style.card}>
      <h1 className={style.titulo}>{nombreCompleto}</h1>
      <div className={style.lineInfo}>
        <p>Total Ticket :</p>{" "}
        <span>{data && data !== null ? data.totalTickets : 0}</span>
      </div>
      
      <div className={style.lineInfo}>
        <p>Asignados :</p>{" "}
        <span>{data && data !== null ? data.asignados : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Desarrollo :</p>{" "}
        <span>{data && data !== null ? data.desarrollo : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Información :</p>{" "}
        <span>{data && data !== null ? data.informacion : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Completo :</p>{" "}
        <span>{data && data !== null ? data.completado : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Terminado :</p>{" "}
        <span>{data && data !== null ? data.terminado : 0}</span>
      </div>
      <div className={style.lineInfo}>
        <p>Hs Promedio :</p>{" "}
        <span>{data && data !== null ? data.hsPromedio : 0}</span>
      </div>
    </div>
  );
}

export default CardInformacionWorker;

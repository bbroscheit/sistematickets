import React from "react";
import { useState, useEffect } from "react";
import style from "../modules/cardWorker.module.css";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import { ticketEnDesarrollo } from "@/functions/ticketEnDesarrollo";
import { ticketCompletos } from "@/functions/ticketCompletos";
import { horasPromedioHabiles } from '@/functions/horasPromedioHabiles';
import { ticketFinalizados } from "@/functions/ticketFinalizados";
import { ticketMasInformacion } from "@/functions/ticketMasInformacion";
import { ticketAsignados } from "@/functions/ticketAsignados";


function CardBySalepoint({ salepoint }) {
  const [user, setUser] = useState(null);
  const [ticketBySalepoint, setTicketBySalepoint] = useState(null);
//   const [soportesCompletados, setSoportesCompletados] = useState(null)
//   const [soportesFinalizados, setSoportesFinalizados] = useState(null)
//   let promedioHoras = 0

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  useEffect(() => {
    fetch(
      `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsBySalepoint?salepoint=${salepoint}`
    )
      // fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsBySalepoint?salepoint=${salepoint}`)
      .then((res) => res.json())
      .then((data) => {
        setTicketBySalepoint(data);
      });
  }, []);

//   if (soportesCompletados && soportesFinalizados) {
//     const soportes = [...soportesCompletados, ...soportesFinalizados];
//     promedioHoras = horasPromedioHabiles(soportes);
//   }

  console.log("soportes", ticketBySalepoint)

  return (
    <>
      <div className={style.cardWorker}>
        <div className={style.cardWorkerUser}>
          {salepoint}
        </div>
        {/* <h3 className={style.cardWorkerUserTitle}>
          {firstname} {lastname}
        </h3> */}
        <h4 className={style.cardWorkerUserTitle}>
          Soportes Totales
        </h4>
        {/* <h4 className={style.cardWorkerUserTitle}>
          {projectByWorker !== null && projectByWorker.length > 0 ?  projectByWorker.length : 0}
        </h4>
        <div className={style.gridTicket}>
          <h4 className={style.gridTicketTitle}>Asignados :</h4>
          <h4>{projectByWorker !== null && projectByWorker.length > 0 ? ticketAsignados(projectByWorker).length : 0}</h4>
          <h4 className={style.gridTicketTitle}>En Desarrollo :</h4>
          <h4>{projectByWorker !== null && projectByWorker.length > 0 ? ticketEnDesarrollo(projectByWorker).length : 0}</h4>
          <h4 className={style.gridTicketTitle}>Más Información :</h4>
          <h4>{projectByWorker !== null && projectByWorker.length > 0 ? ticketMasInformacion(projectByWorker).length : 0}</h4>
          <h4 className={style.gridTicketTitle}>Completados :</h4>
          <h4>{projectByWorker !== null && projectByWorker.length > 0 ? ticketFinalizados(projectByWorker).length : 0}</h4>
          <h4 className={style.gridTicketTitle}>Terminados :</h4>
          <h4>{projectByWorker !== null && projectByWorker.length > 0 ? ticketCompletos(projectByWorker).length : 0}</h4>
        </div>
        
        
        <div className={style.desarrolloContainerTitles}>
          <h4>Tiempo de Respuesta</h4>
          <h4>
          {projectByWorker !== null && projectByWorker.length > 0 ? Math.floor(horasPromedioHabiles(projectByWorker)) : 0} hs
          </h4>
        </div> */}
        
      </div>
    </>
  );
}

export default CardBySalepoint;
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
import { projectAsignados } from "@/functions/projectAsignados";
import { projectFinalizados } from "@/functions/projectFinalizados";
import { horasPromedioCapacitaciones } from '@/functions/horasPromedioCapacitaciones'



function CardWorker({ worker, firstname, lastname }) {
  const [user, setUser] = useState(null);
  const [projectByWorker, setProyectByWorker] = useState(null);
  const [project, setProyect] = useState(null);
  const [projectAsignadosFiltered, setProyectAsignadosFiltered] = useState(null);
  const [projectFinalizadosFiltered, setProyectFinalizadosFiltered] = useState(null);
  const [soportesCompletados, setSoportesCompletados] = useState(null)
  const [soportesFinalizados, setSoportesFinalizados] = useState(null)
  const [capacitationByWorker , setCapacitationByWorker] = useState(null)
  
  let promedioHoras = 0

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  useEffect(() => {
    fetch(
      `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByWorker?worker=${worker}`
    )
      // fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByWorker?worker=${worker}`)
      .then((res) => res.json())
      .then((data) => {
        setProyectByWorker(data);
        setSoportesCompletados(ticketFinalizados(data))
        setSoportesFinalizados(ticketCompletos(data))
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/projectByWorker?worker=${worker}`
    )
      // fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/projectByWorker?worker=${worker}`)
      .then((res) => res.json())
      .then((data) => {
        setProyect(data);
        setProyectAsignadosFiltered(projectAsignados(data))
        setProyectFinalizadosFiltered(projectFinalizados(data))
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/capacitationByWorker?worker=${worker}`
    )
      // fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/capacitationByWorker?worker=${worker}`)
      .then((res) => res.json())
      .then((data) => {
        setCapacitationByWorker(data);
        
      });
  }, []);

  if (soportesCompletados && soportesFinalizados) {
    const soportes = [...soportesCompletados, ...soportesFinalizados];
    promedioHoras = horasPromedioHabiles(soportes);
  }

  

  return (
    <>
      <div className={style.cardWorker}>
        <div className={style.cardWorkerUser}>
          {devuelveIniciales(firstname, lastname)}
        </div>
        <h3 className={style.cardWorkerUserTitle}>
          {firstname} {lastname}
        </h3>
        <h4 className={style.cardWorkerUserTitle}>
          Soportes Totales
        </h4>
        <h4 className={style.cardWorkerUserTitle}>
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
        </div>

        {
          capacitationByWorker !== null && capacitationByWorker.length > 0 ?
            <>  
            <hr className={style.hr}></hr>
            <h4 className={style.cardWorkerUserTitle}>
              Capacitaciones
            </h4>
            <div className={style.gridTicket}>
            <h4 className={style.gridTicketTitle}>Terminados :</h4>
            <h4>{capacitationByWorker.length}</h4>
            </div>

            <div className={style.desarrolloContainerTitles}>
              <h4>Tiempo de Capacitacion</h4>
              <h4>
                {Math.floor(horasPromedioCapacitaciones(capacitationByWorker))} hs
              </h4>
            </div>
            </> : null
        }

        {
          project !== null && project.length && project.state !== "failure" > 0 ?
            <>  
            <hr className={style.hr}></hr>
            <h4 className={style.cardWorkerUserTitle}>
              Proyectos
            </h4>
            <div className={style.gridTicket}>
            <h4 className={style.gridTicketTitle}>Asignados :</h4>
            <h4>{ projectAsignadosFiltered !== null && projectAsignadosFiltered.length > 0 ? projectAsignadosFiltered.length : 0 }</h4>
            <h4 className={style.gridTicketTitle}>Terminados :</h4>
            <h4>{ projectFinalizadosFiltered !== null && projectFinalizadosFiltered.length > 0 ? projectFinalizadosFiltered.length : 0 }</h4>
            </div>
            
            </> : null
        }


        
      </div>
    </>
  );
}

export default CardWorker;

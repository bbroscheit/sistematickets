import React from "react";
import { useState, useEffect } from "react";
import style from "../modules/cardWorker.module.css";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import { ticketEnDesarrollo } from "@/functions/ticketEnDesarrollo";
import { ticketCompletos } from "@/functions/ticketCompletos";


function CardWorker({ worker, firstname, lastname }) {
  const [user, setUser] = useState(null);
  const [projectByWorker, setProyectByWorker] = useState(null);

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
      });
  }, []);

  return (
    <>
      <div className={style.cardWorker}>
        <div className={style.cardWorkerUser}>
          {devuelveIniciales(firstname, lastname)}
        </div>
        <h3 className={style.cardWorkerUserTitle}>
          {firstname} {lastname}
        </h3>
        <div className={style.desarrolloContainer}>
          <div className={style.desarrolloContainerTitles}>
            <h4>En Desarrollo</h4>
            <h4>
              {projectByWorker !== null && projectByWorker.length > 0
                ? ticketEnDesarrollo(projectByWorker).length
                : 0}
            </h4>
          </div>
          <div className={style.desarrolloContainerTitles}>
            <h4>Completas</h4>
            <h4>
              {projectByWorker !== null && projectByWorker.length > 0
                ? ticketCompletos(projectByWorker).length
                : 0}
            </h4>
          </div>
        </div>
        {user !== null && user.sector === "Sistemas" ? (
          <div className={style.desarrolloContainerTitles}>
            <h4>Tiempo de Respuesta</h4>
            <h4>
               0 hs
            </h4>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CardWorker;

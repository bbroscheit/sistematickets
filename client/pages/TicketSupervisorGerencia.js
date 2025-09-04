import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketSupervisorSector.module.css";
import useAutoFetchDesarrollos from "@/hooks/useAutoFetchDesarrollos";
import UsersGeneral from "./supervisor/UsersGeneral";
import TicketVistaDesarrollo from "./desarrollos/TicketVistaDesarrollo";
import useUser from "@/hooks/useUser";

function TicketsSupervisorGerencia() {
  const [user, setUser] = useUser()
  const [desarrollos, setDesarrollos] = useState(null);
  const [flag, setFlag] = useState(false);

  const baseUrl = `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001`;

  useAutoFetchDesarrollos(`${baseUrl}/desarrollo`, setDesarrollos);

  return (
    <div className={mainStyle.container}>
      {user !== null ? (
        <h1 className={mainStyle.title}>{user.sector}</h1>
      ) : (
        <h1 className={mainStyle.title}>Jefe de Administración</h1>
      )}
      {desarrollos === null || desarrollos.length === 0 ? (
        <div className={style.container}>
          <UsersGeneral />
        </div>
      ) : (
        <>
          <div className={style.buttonContainer}>
            <button className={flag === false ? style.buttonActive : style.buttonInactive}onClick={() => setFlag(false)}>
              Soportes
            </button>
            <button className={ flag === false ? style.buttonInactive : style.buttonActive} onClick={() => setFlag(true)}>
              Desarrollos
            </button>
          </div>
          {flag === false ? (
            <div
              className={
                flag === false
                  ? style.ticketVistaContainerActive
                  : style.ticketVistaContainerInactive
              }
            >
              <div className={style.container}>
                <UsersGeneral />
              </div>
            </div>
          ) : (
            <div
              className={
                flag === false
                  ? style.ticketVistaContainerInactive
                  : style.ticketVistaContainerActive
              }
            >
              <TicketVistaDesarrollo desarrollos={desarrollos} user={user} />
            </div>
          )}
        </>
      )}
      <></>
    </div>
  );
}

export default TicketsSupervisorGerencia;
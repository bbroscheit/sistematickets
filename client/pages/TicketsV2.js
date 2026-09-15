import React from "react";
import { useState } from "react";
import styles from "@/modules/Ticket.module.css";
import style from "@/modules/TicketV2.module.css";
import mainStyles from "@/styles/Home.module.css";
import useUser from "../hooks/useUser";
import useAutoFetch from "@/hooks/useAutoFetch.js";
import useAutoFetchDesarrollos from "@/hooks/useAutoFetchDesarrollos.js";
import TicketVistaV2 from "./ticketVista/TicketVistaV2.js";
import TicketVistaDesarrollo from "./desarrollos/TicketVistaDesarrollo.js";

function TicketsV2() {
  const [user, setUser] = useUser("");
  const [ticketGenerados, setTicketsGenerados] = useState(null);
  const [ticketAsignados, setTicketsAsignados] = useState(null);
  const [ticketDesarrollo, setTicketsDesarrollo] = useState(null);
  const [ticketDesarrollo2, setTicketsDesarrollo2] = useState(null); // le puse desarrollo2 pero en realidad son los que necesitan mas informacion
  const [ticketCompletado, setTicketsCompletado] = useState(null);
  const [desarrollos, setDesarrollos] = useState(null);
  const [flag, setFlag] = useState(false);

  const baseUrl = `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001`;

  useAutoFetchDesarrollos(`${baseUrl}/desarrollo`, setDesarrollos);
  useAutoFetch(`${baseUrl}/ticketGenerados`, setTicketsGenerados);
  useAutoFetch(`${baseUrl}/ticketAsignados`, setTicketsAsignados);
  useAutoFetch(`${baseUrl}/ticketDesarrollo`, setTicketsDesarrollo);
  useAutoFetch(`${baseUrl}/ticketDesarrollo2`, setTicketsDesarrollo2);
  useAutoFetch(`${baseUrl}/ticketCompletado`, setTicketsCompletado);

  return (
    <div className={`${mainStyles.container} ${styles.mobileContainer}`}>
      <div className={style.pageWrap}>
        <div className={style.column}>
          <div className={style.pageHead}>
            <h1>Soportes</h1>
            <p>Acá podés ver el estado de tus consultas.</p>
          </div>

          {desarrollos === null || desarrollos.length === 0 ? (
            <TicketVistaV2
              ticketGenerados={ticketGenerados}
              ticketAsignados={ticketAsignados}
              ticketDesarrollo={ticketDesarrollo}
              ticketDesarrollo2={ticketDesarrollo2}
              ticketCompletado={ticketCompletado}
              user={user}
            />
          ) : (
            <>
              <div className={styles.buttonContainer}>
                <button className={flag === false ? styles.buttonActive : styles.buttonInactive} onClick={() => setFlag(false)}> Soportes </button>
                <button className={flag === false ? styles.buttonInactive : styles.buttonActive} onClick={() => setFlag(true)}> Desarrollos </button>
              </div>

              {flag === false ? (
                <div className={flag === false ? styles.ticketVistaContainerActive : styles.ticketVistaContainerInactive}>
                  <TicketVistaV2
                    ticketGenerados={ticketGenerados}
                    ticketAsignados={ticketAsignados}
                    ticketDesarrollo={ticketDesarrollo}
                    ticketDesarrollo2={ticketDesarrollo2}
                    ticketCompletado={ticketCompletado}
                    user={user}
                  />
                </div>
              ) : (
                <div className={flag === false ? styles.ticketVistaContainerInactive : styles.ticketVistaContainerActive}>
                  <TicketVistaDesarrollo
                    desarrollos={desarrollos}
                    user={user}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketsV2;

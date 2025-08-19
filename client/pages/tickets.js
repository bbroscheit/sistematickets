import React from "react";
import { useState, useEffect } from "react";
import styles from "@/modules/Ticket.module.css";
import mainStyles from "@/styles/Home.module.css";
import useUser from "@/hooks/useUser.js";
import useAutoFetch from "@/hooks/useAutoFetch.js";
import useAutoFetchDesarrollos from "@/hooks/useAutoFetchDesarrollos.js";
import TicketVista from "./ticketVista/TicketVista.js";
import TicketVistaDesarrollo from "./desarrollos/TicketVistaDesarrollo.js";

function Tickets() {
  const [ticketGenerados, setTicketsGenerados] = useState(null);
  const [ticketAsignados, setTicketsAsignados] = useState(null);
  const [ticketDesarrollo, setTicketsDesarrollo] = useState(null);
  const [ticketDesarrollo2, setTicketsDesarrollo2] = useState(null); // le puse desarrollo2 pero en realidad son los que necesitan mas informacion
  const [ticketCompletado, setTicketsCompletado] = useState(null);
  const [desarrollos, setDesarrollos] = useState(null);
  const [user, setUser] = useUser();
  const [flag, setFlag] = useState(false);

  const baseUrl = `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001`;

  useAutoFetchDesarrollos(`${baseUrl}/desarrollo`, setDesarrollos);
  useAutoFetch(`${baseUrl}/ticketGenerados`, setTicketsGenerados);
  useAutoFetch(`${baseUrl}/ticketAsignados`, setTicketsAsignados);
  useAutoFetch(`${baseUrl}/ticketDesarrollo`, setTicketsDesarrollo);
  useAutoFetch(`${baseUrl}/ticketDesarrollo2`, setTicketsDesarrollo2);
  useAutoFetch(`${baseUrl}/ticketCompletado`, setTicketsCompletado);

  // useEffect(() => {
  //   const eventSource = new EventSource(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketSSE`)

  //   function updateMessage(message){
  //    console.log(message)
  //   }

  //   eventSource.onmessage = function (event){
  //     updateMessage(event.data)
  //   }

  //   eventSource.onerror = function(){
  //     updateMessage('error connection')
  //   }

  //   return () => {
  //     eventSource.close();
  //   };
  // })

  //console.log("desarrollo", desarrollos);
  return (

      <div className={`${mainStyles.container} ${styles.mobileContainer}`}>
        <h1 className={mainStyles.title}>SOPORTES</h1>
        {desarrollos === null || desarrollos.length === 0 ? (
          < >
            <TicketVista
              ticketGenerados={ticketGenerados}
              ticketAsignados={ticketAsignados}
              ticketDesarrollo={ticketDesarrollo}
              ticketDesarrollo2={ticketDesarrollo2}
              ticketCompletado={ticketCompletado}
              user={user}
            />
          </>
        ) : (
          <>
            {" "}
            <div className={styles.buttonContainer}>
              <button className={flag === false ? styles.buttonActive : styles.buttonInactive }onClick={() => setFlag(false)}> Soportes </button>
              <button className={flag === false ? styles.buttonInactive : styles.buttonActive}onClick={() => setFlag(true)}> Desarrollos </button>
            </div>

            {flag === false ? (
              <div className={flag === false ? styles.ticketVistaContainerActive : styles.ticketVistaContainerInactive}>
              <TicketVista
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

  );
}

export default Tickets;

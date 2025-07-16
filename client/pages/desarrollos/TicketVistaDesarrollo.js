import React, { useState, useEffect } from "react";
import CardTicketDesarrollo from "@/components/CardTicketDesarrollo";
import styles from "@/modules/Ticket.module.css";

function TicketVistaDesarrollo({ desarrollos, user }) {
  const [ticketGenerados, setTicketsGenerados] = useState(null);
  const [ticketAsignados, setTicketsAsignados] = useState(null);
  const [ticketDesarrollo, setTicketsDesarrollo] = useState(null);
  const [ticketDesarrollo2, setTicketsDesarrollo2] = useState(null); // le puse desarrollo2 pero en realidad son los que necesitan mas informacion
  const [ticketCompletado, setTicketsCompletado] = useState(null);

  useEffect(() => {
    if (!desarrollos || desarrollos.length === 0) return

    const todosLosTickets = desarrollos.flatMap((d) =>
        (d.tickets || []).map(ticket => ({
            ...ticket,
            desarrolloTitle: d.title // agregamos el título del desarrollo
        }))
    )

    // Agrupamos por estado
    const generados = todosLosTickets.filter(
      (ticket) => ticket.state === "sin asignar"
    )
    const asignados = todosLosTickets.filter(
      (ticket) => ticket.state === "Asignado"
    )
    const enDesarrollo = todosLosTickets.filter(
      (ticket) => ticket.state === "Desarrollo"
    )
    const necesitaMasInfo = todosLosTickets.filter(
      (ticket) => ticket.state === "Informacion"
    ) 
    const completados = todosLosTickets.filter(
      (ticket) => ticket.state === "Completado"
    )

    setTicketsGenerados(generados)
    setTicketsAsignados(asignados)
    setTicketsDesarrollo(enDesarrollo)
    setTicketsDesarrollo2(necesitaMasInfo)
    setTicketsCompletado(completados)
  }, [desarrollos])

  
  return (
    <>
      {/* a pedido de Gcurcio se crea una vista para que ella pueda ver todos los soportes activos, en caso de que el usuario no sea curcio, el programa entra por la via normal y cada usuario solo ve su soporte creado o Asignado */}
      <div className={styles.divWithDiv}>
        {ticketGenerados !== null && ticketGenerados.length > 0 ? (
          <div className={styles.gridContainer}>
            <h2>Soportes sin asignar</h2>
            {ticketGenerados.map((e) =>
              user !== null && e.user !== null ? (
                <React.Fragment key={e.id}>
                  <CardTicketDesarrollo
                    key={e.id}
                    id={e.id}
                    subject={e.subject}
                    state={e.state}
                    created={e.createdAt}
                    username={e.user.username}
                    title = {e.desarrolloTitle}
                  />
                </React.Fragment>
              ) : null
            )}
          </div>
        ) : null}

        {ticketAsignados !== null && ticketAsignados.length > 0 ? (
          <div className={styles.gridContainer}>
            <h2>Soportes Asignados</h2>
            {ticketAsignados.map((e) =>
              user !== null && e.user !== null ? (
                <React.Fragment key={e.id}>
                  <CardTicketDesarrollo
                    key={e.id}
                    id={e.id}
                    subject={e.subject}
                    state={e.state}
                    created={e.createdAt}
                    username={e.user.username}
                    title = {e.desarrolloTitle}
                  />
                </React.Fragment>
              ) : null
            )}
          </div>
        ) : null}

        {ticketDesarrollo !== null && ticketDesarrollo.length > 0 ? (
          <div className={styles.gridContainer}>
            <h2>Soportes En Desarrollo</h2>
            {ticketDesarrollo.map((e) =>
              user !== null && e.user !== null ? (
                <React.Fragment key={e.id}>
                  <CardTicketDesarrollo
                    key={e.id}
                    id={e.id}
                    subject={e.subject}
                    state={e.state}
                    created={e.createdAt}
                    username={e.user.username}
                  />
                </React.Fragment>
              ) : null
            )}
          </div>
        ) : null}

        {ticketDesarrollo2 !== null && ticketDesarrollo2.length > 0 ? (
          <div className={styles.gridContainer}>
            <h2>Soportes que necesitan más información</h2>
            {ticketDesarrollo2.map((e) =>
              user !== null && e.user !== null ? (
                <React.Fragment key={e.id}>
                  <CardTicketDesarrollo
                    key={e.id}
                    id={e.id}
                    subject={e.subject}
                    state={e.state}
                    created={e.createdAt}
                    username={e.user.username}
                  />
                </React.Fragment>
              ) : null
            )}
          </div>
        ) : null}

        {ticketCompletado !== null && ticketCompletado.length > 0 ? (
          <div className={styles.gridContainer}>
            <h2>Soportes pendientes de cierre</h2>
            {ticketCompletado.map((e) =>
              user !== null && e.user !== null ? (
                <React.Fragment key={e.id}>
                  <CardTicketDesarrollo
                    key={e.id}
                    id={e.id}
                    subject={e.subject}
                    state={e.state}
                    created={e.createdAt}
                    username={e.user.username}
                  />
                </React.Fragment>
              ) : null
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default TicketVistaDesarrollo;

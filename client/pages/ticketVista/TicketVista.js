import React from "react";
import Card from "@/components/Card";
import mainStyles from "@/styles/Home.module.css";
import styles from "@/modules/Ticket.module.css";

function TicketVista({
  ticketGenerados,
  ticketAsignados,
  ticketDesarrollo,
  ticketDesarrollo2,
  ticketCompletado,
  user,
}) {

    
  return (
    <>
      {/* a pedido de Gcurcio se crea una vista para que ella pueda ver todos los soportes activos, en caso de que el usuario no sea curcio, el programa entra por la via normal y cada usuario solo ve su soporte creado o Asignado */}
      {user !== null &&
      (user.name === "Gcurcio" || user.name === "Administrador") ? (
        //<div className={`${mainStyles.container} ${styles.mobileContainer}`}>
        <div className={styles.divWithDiv}>
          {/* <h1 className={mainStyles.title}>SOPORTES</h1> */}

          {ticketGenerados !== null && ticketGenerados.length > 0 ? (
            <div className={styles.gridContainer}>
              <h2>Soportes sin asignar</h2>
              {ticketGenerados.map((e) =>
                user !== null && e.user !== null ? (
                  <React.Fragment key={e.id}>
                    <Card
                      key={e.id}
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.createdAt}
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
                    <Card
                      key={e.id}
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.createdAt}
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
                    <Card
                      key={e.id}
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.createdAt}
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
                    <Card
                      key={e.id}
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.createdAt}
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
                    <Card
                      key={e.id}
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.createdAt}
                    />
                  </React.Fragment>
                ) : null
              )}
            </div>
          ) : null }
        </div>
      ) : (
        //<div className={mainStyles.container}>
        <div className={styles.divWithDiv}>
          {/* <h1 className={mainStyles.title}>SOPORTES</h1> */}
          {user !== null && user.sector !== "Sistemas" ? (
            <>
              {ticketGenerados !== null && ticketGenerados.length > 0 ? (
                <div className={styles.gridContainer}>
                  <h2>Soportes sin asignar</h2>
                  {ticketGenerados.map((e) =>
                    user !== null &&
                    e.user !== null &&
                    user.name === e.user.username ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
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
                    user !== null &&
                    e.user !== null &&
                    user.name === e.user.username ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
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
                    user !== null &&
                    e.user !== null &&
                    user.name === e.user.username ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
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
                    user !== null &&
                    e.user !== null &&
                    user.name === e.user.username ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
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
                    user !== null &&
                    e.user !== null &&
                    user.name === e.user.username ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
                        />
                      </React.Fragment>
                    ) : null
                  )}
                </div>
              ) : null}
            </>
          ) : null}

          {user !== null && user.sector === "Sistemas" ? (
            <>
              {ticketGenerados !== null && ticketGenerados.length > 0 ? (
                <div className={styles.gridContainer}>
                  <h2>Soportes Generados</h2>
                  {ticketGenerados.map((e) => (
                    <React.Fragment key={e.id}>
                      <Card
                        key={e.id}
                        id={e.id}
                        subject={e.subject}
                        state={e.state}
                        created={e.createdAt}
                      />
                    </React.Fragment>
                  ))}
                </div>
              ) : null}

              {ticketAsignados !== null && ticketAsignados.length > 0 ? (
                <div className={styles.gridContainer}>
                  <h2>Soportes Asignados</h2>
                  {ticketAsignados.map((e) =>
                    user !== null && user.name === e.worker ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
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
                    user !== null && user.name === e.worker ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
                        />
                      </React.Fragment>
                    ) : null
                  )}
                </div>
              ) : null}

              {ticketDesarrollo2 !== null && ticketDesarrollo2.length > 0 ? (
                <div className={styles.gridContainer}>
                  <h2>Soportes que necesitan mas información</h2>
                  {ticketDesarrollo2.map((e) =>
                    user !== null && user.name === e.worker ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
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
                    user !== null && user.name === e.worker ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.createdAt}
                        />
                      </React.Fragment>
                    ) : null
                  )}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default TicketVista;

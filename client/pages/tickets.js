import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Card.js";
import styles from "../modules/Ticket.module.css";
import mainStyles from "@/styles/Home.module.css";
import { style } from "@mui/system";

function Tickets() {
  const [ticketGenerados, setTicketsGenerados] = useState(null);
  const [ticketAsignados, setTicketsAsignados] = useState(null);
  const [ticketDesarrollo, setTicketsDesarrollo] = useState(null);
  const [ticketDesarrollo2, setTicketsDesarrollo2] = useState(null); // le puse desarrollo2 pero en realidad son los que necesitan mas informacion
  const [ticketCompletado, setTicketsCompletado] = useState(null);
  const [user, setUser] = useState(null);
  const [control, setControl] = useState(0)
  
  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  
  useEffect(() => {
    
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsGenerados(data);
      });
    

    const interval = setInterval(() => {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsGenerados(data);
      });
    }, 5000 )

    return (() => {
      clearInterval(interval)
    })
    
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAsignados`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAsignados`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsAsignados(data);
      });

    const interval = setInterval(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAsignados`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAsignados`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsAsignados(data);
      });
    }, 5000)

    return (() => {
      clearInterval(interval)
    })
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo(data);
      });

    const interval = setInterval(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo(data);
      });
    }, 5000)

    return (() => {
      clearInterval(interval)
    })
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo2`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo2`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo2(data);
      });

    const interval = setInterval(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo2`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo2`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo2(data);
      });
    }, 5000)

    return (() => {
      clearInterval(interval)
    })
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsCompletado(data);
      });
      
    const interval = setInterval(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsCompletado(data);
      });
    }, 5000)

    return (() => {
      clearInterval(interval)
    })

  }, []);

  

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

  return (
    <>
    
      {/* a pedido de Gcurcio se crea una vista para que ella pueda ver todos los soportes activos, en caso de que el usuario no sea curcio, el programa entra por la via normal y cada usuario solo ve su soporte creado o Asignado */}
      {user !== null && (user.name === "Gcurcio" || user.name === "Administrador") ? (
        <div className={`${mainStyles.container} ${styles.mobileContainer}`}>
          <h1 className={mainStyles.title}>SOPORTES</h1>
          
              {ticketGenerados !== null && ticketGenerados.length > 0 ? (
                <div className={styles.gridContainer}>
                  <h2>Soportes sin asignar</h2>
                  {ticketGenerados.map((e) =>
                    user !== null &&
                    e.user !== null ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.created}
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
                    e.user !== null ? (
                      <React.Fragment key={e.id}>
                        <Card
                          key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.created}
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
                    e.user !== null  ? (
                      <React.Fragment key={e.id}>
                        <Card
                        key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.created}
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
                    e.user !== null  ? (
                      <React.Fragment key={e.id}>
                        <Card
                        key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.created}
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
                    e.user !== null  ? (
                      <React.Fragment key={e.id}>
                        <Card
                        key={e.id}
                          id={e.id}
                          subject={e.subject}
                          state={e.state}
                          created={e.created}
                        />
                      </React.Fragment>
                    ) : null
                  )}
                </div>
              ) : null}
            
          
        </div>
      ) : (
        <div className={mainStyles.container}>
          <h1 className={mainStyles.title}>SOPORTES</h1>
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
                          created={e.created}
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
                          created={e.created}
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
                          created={e.created}
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
                          created={e.created}
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
                          created={e.created}
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
                      created={e.created}
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
                          created={e.created}
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
                          created={e.created}
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
                          created={e.created}
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
                          created={e.created}
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

export default Tickets;

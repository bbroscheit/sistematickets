import React from "react";
import { useState, useEffect } from "react";
import Card from '../components/Card.js';
import styles from '../modules/Ticket.module.css';


function tickets() {
  const [ticketGenerados, setTicketsGenerados] = useState(null);
  const [ticketDesarrollo, setTicketsDesarrollo] = useState(null);
  const [ticketDesarrollo2, setTicketsDesarrollo2] = useState(null);
  const [ticketCompletado, setTicketsCompletado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/ticketGenerados")
      .then((res) => res.json())
      .then((data) => {
        setTicketsGenerados(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/ticketDesarrollo")
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/ticketDesarrollo2")
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo2(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/ticketCompletado")
      .then((res) => res.json())
      .then((data) => {
        setTicketsCompletado(data);
      });
  }, []);

  return (
    <div className={styles.ticketContainer}>
      <h1 className={styles.ticketTitle}>SOPORTES</h1>
      {ticketGenerados  && (
        <div>
          <h2>Soportes Generados</h2>
          {ticketGenerados.map((e) => (
            <Card id= {e.id} subject= {e.subject} />
             ))}
        </div>
      )}
      {ticketDesarrollo && (
        <div>
          <h2>Soportes En Desarrollo</h2>
          {ticketDesarrollo.map((e) => (
            <Card id= {e.id} subject= {e.subject} />
          ))}
        </div>
      )}
      {ticketDesarrollo2 && (
        <div>
          <h2>Soportes que necesitan mas información</h2>
          {ticketDesarrollo2.map((e) => (
            <Card id= {e.id} subject= {e.subject} />
          ))}
        </div>
      )}
      {ticketCompletado && (
        <div>
          <h2>Soportes pendientes de cierre</h2>
          {ticketCompletado.map((e) => (
            <Card id= {e.id} subject= {e.subject} />
          ))}
        </div>
      )}
    </div>
  );
}

export default tickets;
